import { createClient } from "./supabase.js";

const SUPABASE_URL = "https://knznyynnqpxxllffzldw.supabase.co";
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtuem55eW5ucXB4eGxsZmZ6bGR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4ODU1NjMsImV4cCI6MjA4MDQ2MTU2M30.sB_K_gMfvz0U8PzW-eGkqctMR8g70w46JtdiZnrcCao";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

let modo = "login"; 

document.querySelectorAll("input").forEach(inp=>{
  inp.addEventListener("input",()=>{
    inp.value = inp.value.replace(/\s/g,""); 
  });
});

document.getElementById("toggle").onclick = ()=>{
  if(modo==="login"){
    modo="cadastro";
    document.querySelector("h1").innerText="Login";
    document.getElementById("email").style.display="none";
    document.getElementById("emailLabel").style.display="none";
    document.getElementById("esq").innerText="Esqueci minha senha";
    document.getElementById("toggle").innerText="Cadastrar";
    document.getElementById("btn").innerText="Entrar";
  } else {
    modo="login";
    document.querySelector("h1").innerText="Cadastrar-se";
    document.getElementById("email").style.display="";
    document.getElementById("emailLabel").style.display="";
    document.getElementById("esq").innerText="";
    document.getElementById("toggle").innerText="Logar-se";
    document.getElementById("btn").innerText="Criar";
  }
};

document.getElementById("btn").onclick=()=>{
  let n=document.getElementById("nick").value;
  let s=document.getElementById("senha").value;
  if(n.length>=3 && s.length>=6) alert("OK");
  else document.querySelector("h4").innerText="Nome ou senha curtos";
};