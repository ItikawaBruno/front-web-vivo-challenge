import { useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./adiciona-tarefa.css"

const schema = yup.object({
  titulo: yup.string().required("Digite o título da tarefa"),
  descricao: yup.string().required("Digite a descrição da tarefa"),
  dataInicio: yup.string().required("Digite a data início da tarefa"),
  dataTermino: yup.string().required("Digite a data término da tarefa"),
  emailColaborador: yup.string().email("Digite um e-mail válido").required("Digite o e-mail do colaborador"),
});

export default function CriaTarefa() {
  const navigate = useNavigate();

  type FormData = {
    titulo: string;
    descricao: string;
    dataInicio: string;
    dataTermino: string;
    emailColaborador: string;
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      titulo: "",
      descricao: "",
      dataInicio: "",
      dataTermino: "",
      emailColaborador: "",
    },
  });

  function criar(data: FormData) {
    console.log(data);
  }

  return (
    <div className="container">
      <button className="icon" onClick={() => navigate("/gestor/menu")}>
        <MdArrowBack size={22} />
      </button>

      <p className="title">Criação de Tarefa</p>

      <form className="form" onSubmit={handleSubmit(criar)}>
        <label className="label">Título</label>
        <Controller
          name="titulo"
          control={control}
          render={({ field }) => (
            <input
              className="input"
              placeholder="Digite o título da tarefa..."
              {...field}
            />
          )}
        />
        {errors.titulo && (
          <p className="error">{errors.titulo?.message}</p>
        )}

        <label className="label">Descrição</label>
        <Controller
          name="descricao"
          control={control}
          render={({ field }) => (
            <input
              className="input"
              placeholder="Digite a descrição da tarefa..."
              {...field}
            />
          )}
        />
        {errors.descricao && (
          <p className="error">{errors.descricao?.message}</p>
        )}

        <label className="label">Data Início</label>
        <Controller
          name="dataInicio"
          control={control}
          render={({ field }) => (
            <input
              type="date"
              className="input"
              {...field}
            />
          )}
        />
        {errors.dataInicio && (
          <p className="error">{errors.dataInicio?.message}</p>
        )}

        <label className="label">Data Término</label>
        <Controller
          name="dataTermino"
          control={control}
          render={({ field }) => (
            <input
              type="date"
              className="input"
              {...field}
            />
          )}
        />
        {errors.dataTermino && (
          <p className="error">{errors.dataTermino?.message}</p>
        )}

        <label className="label">E-mail do Colaborador</label>
        <Controller
          name="emailColaborador"
          control={control}
          render={({ field }) => (
            <input
              className="input"
              type="email"
              placeholder="Digite o e-mail do colaborador..."
              {...field}
            />
          )}
        />
        {errors.emailColaborador && (
          <p className="error">{errors.emailColaborador?.message}</p>
        )}

        <button type="submit" className="button">
          Criar
        </button>
      </form>
    </div>
  );
}
