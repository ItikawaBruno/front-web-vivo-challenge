import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { MdArrowRight } from "react-icons/md";
import "./cadastro.css";

// ✅ Tipagem do formulário
type FormData = {
  nome: string;
  email: string;
  senha: string;
  role: "COLABORADOR" | "GESTOR";
  gestorEmail?: string; // Campo opcional
};

// ✅ Schema de validação atualizado
const schema: yup.ObjectSchema<FormData> = yup.object({
  nome: yup.string().required("Informe seu nome."),
  email: yup.string().email("Email inválido.").required("Informe seu email."),
  senha: yup.string().required("Informe sua senha."),
  role: yup
    .mixed<"COLABORADOR" | "GESTOR">()
    .oneOf(["COLABORADOR", "GESTOR"], "Selecione uma opção.")
    .required("Selecione o tipo de usuário."),
  // Validação condicional para o email do gestor
  gestorEmail: yup.string().when("role", {
    is: "COLABORADOR",
    then: (schema) =>
      schema
        .email("Email inválido.")
        .required("Informe o email do gestor."),
    otherwise: (schema) => schema.optional(),
  }),
});

export default function Cadastro() {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      nome: "",
      email: "",
      senha: "",
      role: "COLABORADOR",
      gestorEmail: "",
    },
  });

  // Observa o valor atual do campo 'role' para renderização condicional
  const selectedRole = watch("role");

  // ✅ Envia os dados para a API
  const cadastrarUsuario = async (data: FormData) => {
    console.log("Dados Recebidos", data);

    // Remover gestorEmail se não for necessário
    const payload = selectedRole === "GESTOR" 
      ? { nome: data.nome, email: data.email, senha: data.senha, role: data.role }
      : data;

    try {
      const response = await fetch("http://localhost:8080/usuario/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Conta criada com sucesso!");
        navigate("/menu");
      } else {
        const errorText = await response.text();
        console.error("Erro do servidor:", errorText);
        alert("Não foi possível criar a conta");
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor");
      console.error(error);
    }
  };

  return (
    <div className="cadastro-container">
      <div className="gradient-background">
        <header className="header">
          <h1 className="title">VIVI</h1>
          <p className="subtitle">Sua guia nessa jornada</p>
          <div className="title-underline"></div>
        </header>

        <form className="form" onSubmit={handleSubmit(cadastrarUsuario)}>
          {/* Nome */}
          <label className="label">Nome</label>
          <Controller
            control={control}
            name="nome"
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="input"
                placeholder="Digite seu nome"
              />
            )}
          />
          {errors.nome && <p className="error">{errors.nome.message}</p>}

          {/* Email */}
          <label className="label">E-mail</label>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <input
                {...field}
                type="email"
                className="input"
                placeholder="Digite seu email"
              />
            )}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}

          {/* Senha */}
          <label className="label">Senha</label>
          <Controller
            control={control}
            name="senha"
            render={({ field }) => (
              <input
                {...field}
                type="password"
                className="input"
                placeholder="Digite sua senha"
              />
            )}
          />
          {errors.senha && <p className="error">{errors.senha.message}</p>}

          {/* Tipo de Usuário */}
          <label className="label">Tipo de Usuário</label>
          <Controller
            control={control}
            name="role"
            render={({ field }) => (
              <select {...field} className="input">
                <option value="COLABORADOR">COLABORADOR</option>
                <option value="GESTOR">GESTOR</option>
              </select>
            )}
          />
          {errors.role && <p className="error">{errors.role.message}</p>}

          {/* Campo de email do gestor (aparece somente para colaboradores) */}
          {selectedRole === "COLABORADOR" && (
            <>
              <label className="label">E-mail do Gestor</label>
              <Controller
                control={control}
                name="gestorEmail"
                render={({ field }) => (
                  <input
                    {...field}
                    type="email"
                    className="input"
                    placeholder="E-mail do gestor"
                  />
                )}
              />
              {errors.gestorEmail && (
                <p className="error">{errors.gestorEmail.message}</p>
              )}
            </>
          )}

          {/* Botão */}
          <button className="button" type="submit">
            Cadastrar
          </button>

          {/* Link voltar */}
          <div
            className="link"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            <span className="textColor">Já possuo uma conta</span>
            <MdArrowRight size={22} color="#993399" />
          </div>
        </form>

        <footer className="footer">
          <p>Seus dados estão protegidos</p>
        </footer>
      </div>
    </div>
  );
}