import React from "react";
import ReactDOM from "react-dom/client";

interface Param {
  id: number;
  name: string;
  type: "string";
}

interface ParamValue {
  paramId: number;
  value: string;
}

type Color = string;

interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  paramValues: ParamValue[];
  colors: Color[];
  newColor: string;
}

class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      paramValues: props.model.paramValues,
      colors: props.model.colors,
      newColor: "",
    };
  }

  handleChange = (paramId: number, value: string) => {
    this.setState((prevState) => ({
      paramValues: prevState.paramValues.map((paramValue) =>
        paramValue.paramId === paramId ? { ...paramValue, value } : paramValue
      ),
    }));
  };

  handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newColor: event.target.value });
  };

  addColor = () => {
    this.setState((prevState) => ({
      colors: [...prevState.colors, prevState.newColor],
      newColor: "",
    }));
  };

  getModel(): Model {
    return {
      paramValues: this.state.paramValues,
      colors: this.state.colors,
    };
  }

  render() {
    const { params } = this.props;
    const { paramValues, colors, newColor } = this.state;

    return (
      <>
        <h2>Редактор параметров</h2>
        {params.map((param) => {
          const paramValue = paramValues.find(
            (value) => value.paramId === param.id
          );
          return (
            <div
              key={param.id}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 5fr",
                marginBottom: "8px",
              }}
            >
              <label htmlFor={`${param.id}`} style={{ textAlign: "center" }}>
                {param.name}
              </label>
              <input
                id={`${param.id}`}
                type="text"
                value={paramValue ? paramValue.value : ""}
                onChange={(e) => this.handleChange(param.id, e.target.value)}
              />
            </div>
          );
        })}
        <p>Цвета: {colors.join(", ")}</p>
        <input
          type="text"
          value={newColor}
          onChange={this.handleColorChange}
          placeholder="Добавить новый цвет"
        />
        <button onClick={this.addColor} style={{ marginLeft: "8px" }}>
          +
        </button>
      </>
    );
  }
}

const params: Param[] = [
  { id: 1, name: "Назначение", type: "string" },
  { id: 2, name: "Длина", type: "string" },
];

const model: Model = {
  paramValues: [
    { paramId: 1, value: "повседневное" },
    { paramId: 2, value: "макси" },
  ],
  colors: [],
};

const App: React.FC = () => {
  const paramEditorRef = React.useRef<ParamEditor>(null);

  const handleGetModel = () => {
    if (paramEditorRef.current) {
      const updatedModel = paramEditorRef.current.getModel();
      console.log(updatedModel);
    }
  };

  return (
    <main>
      <ParamEditor ref={paramEditorRef} params={params} model={model} />
      <button
        onClick={handleGetModel}
        style={{ display: "block", marginTop: "8px" }}
      >
        Получить модель
      </button>
    </main>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
