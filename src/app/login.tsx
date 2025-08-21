import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

type FormData = {
  email: string;
  senha: string;
};

const schema = yup.object({
  email: yup.string().email("E-mail inválido").required("Digite seu email"),
  senha: yup.string().required("Digite sua senha"),
});

export default function login() {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Simulando fetch:
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        if (res.ok) {
          navigate("/menu");
        } else {
          alert("Login falhou: usuário ou senha incorretos");
        }
      })
      .catch((err) => {
        console.error("Erro na requisição:", err);
        alert("Erro ao conectar com o servidor");
      });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #663399, #993399, #CC66CC)",
        position: "relative",
        flexDirection: "column",
      }}
    >
      <h1 style={{ color: "#c042c0ff", marginBottom: 10 }}>VIVI</h1>
      <div
        style={{
          width: 60,
          height: 4,
          backgroundColor: "#FFD23F",
          borderRadius: 2,
          marginBottom: 40,
        }}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          width: "90%",
          maxWidth: 400,
          backgroundColor: "rgba(226, 226, 226, 0.801)",
          padding: 20,
          borderRadius: 10,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label>E-mail</label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <input
              type="email"
              placeholder="Digite seu e-mail"
              {...field}
              style={{
                padding: 12,
                borderRadius: 8,
                border: "1px solid #ccc",
                marginTop: 5,
                marginBottom: 5,
              }}
            />
          )}
        />
        {errors.email && (
          <span style={{ color: "#99335a", marginBottom: 15 }}>
            {errors.email.message}
          </span>
        )}

        <label>Senha</label>
        <Controller
          name="senha"
          control={control}
          render={({ field }) => (
            <input
              type="password"
              placeholder="Digite sua senha"
              {...field}
              style={{
                padding: 12,
                borderRadius: 8,
                border: "1px solid #ccc",
                marginTop: 5,
                marginBottom: 5,
              }}
            />
          )}
        />
        {errors.senha && (
          <span style={{ color: "#99335a", marginBottom: 15 }}>
            {errors.senha.message}
          </span>
        )}

        <button
          type="submit"
          style={{
            backgroundColor: "#993399",
            color: "#fff",
            fontWeight: "bold",
            border: "none",
            padding: "12px 40px",
            borderRadius: 8,
            marginTop: 20,
            cursor: "pointer",
          }}
        >
          Entrar
        </button>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 10,
            fontSize: 14,
          }}
        >
          <span
            style={{ color: "#993399", cursor: "pointer" }}
            onClick={() => navigate("/cadastrar")}
          >
            Cadastrar
          </span>
          <span
            style={{ color: "#993399", cursor: "pointer" }}
            onClick={() => navigate("/esqueci-senha")}
          >
            Esqueci minha senha
          </span>
        </div>
      </form>
    </div>
  );
}
