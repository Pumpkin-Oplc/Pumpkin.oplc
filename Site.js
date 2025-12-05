const supabase = window.supabase.createClient(
  "https://knznyynnqpxxllffzldw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtuem55eW5ucXB4eGxsZmZ6bGR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4ODU1NjMsImV4cCI6MjA4MDQ2MTU2M30.sB_K_gMfvz0U8PzW-eGkqctMR8g70w46JtdiZnrcCao"
);

const nick = document.getElementById("nick");
const nickLabel = document.getElementById("nickLabel");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const toggle = document.getElementById("toggle");
const esq = document.getElementById("esq");
const btn = document.getElementById("btn");

const h1 = document.querySelector("h1");
const h4 = document.querySelector("h4");

toggle.onclick = () => {
  if (h1.textContent === "Cadastrar-se") {
    h1.innerText="Login";
    nick.style.display="none";
    nickLabel.style.display="none";
    esq.innerText="Esqueci minha senha";
    toggle.innerText="Cadastrar";
    btn.innerText="Entrar";
  }
  else {
    h1.innerText="Cadastrar-se";
    nick.style.display="";
    nickLabel.style.display="";
    esq.innerText="";
    toggle.innerText="Logar-se";
    btn.innerText="Criar";
  }
};

document.querySelectorAll("input").forEach(inp=>{
  inp.addEventListener("input",()=>{
    inp.value = inp.value.replace(/\s/g,""); 
  });
});

btn.onclick = async () => {
  let n = nick.value;
  let e = email.value;
  let s = senha.value;

  if (h1.textContent === "Cadastrar-se" && n.length < 3) {
    h4.innerText = "Nome muito curto (min 3 caracteres)";
    return;
  }
  if (s.length < 6) {
    h4.innerText = "Senha muito curta (min 6 caracteres)";
    return;
  }
  if (!e.includes("@")) {
    h4.innerText = "Email inválido";
    return;
  }

  if (h1.textContent === "Cadastrar-se") {
    const { data: existingName, error: errName } = await supabase
      .from("users")
      .select("nome")
      .eq("nome", n)
      .limit(1);

    if (errName) {
      h4.innerText = "Erro no servidor";
      return;
    }
    if (existingName.length > 0) {
      h4.innerText = "Nome já existe";
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: e,
      password: s
    });

    if (error) {
      if (error.message.includes("already registered")) {
        h4.innerText = "Email já em uso";
      } else {
        h4.innerText = "Erro ao criar conta: " + error.message;
      }
    } else {
      await supabase.from("users").insert({ nome: n, email: e });
      alert("Conta criada!");
      nick.value = "";
      email.value = "";
      senha.value = "";
      h4.innerText = "";
    }

  } else {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: e,
      password: s
    });

    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        h4.innerText = "Senha incorreta ou usuário não existe";
      } else {
        h4.innerText = "Erro ao logar: " + error.message;
      }
    } else {
      alert("Logado!");
      nick.value = "";
      email.value = "";
      senha.value = "";
      h4.innerText = "";
    }
  }
};