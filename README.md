# 🏫 Horário CETI DARIANA · PWA

App de horário escolar progressivo (PWA) — funciona offline, instalável em celular e computador.

---

## 📁 Estrutura do projeto

```
ceti-dariana/
├── public/
│   ├── index.html       ← App principal
│   ├── manifest.json    ← Configurações do PWA
│   ├── sw.js            ← Service Worker (cache offline)
│   └── icons/
│       ├── icon-192.png
│       └── icon-512.png
├── .github/
│   └── workflows/
│       └── firebase-deploy.yml  ← Deploy automático
├── firebase.json        ← Config do Firebase Hosting
├── .firebaserc          ← ID do projeto Firebase
└── .gitignore
```

---

## 🚀 Passo a Passo — Deploy Completo

### 1️⃣ Criar repositório no GitHub

1. Acesse [github.com](https://github.com) → **New repository**
2. Nome sugerido: `horario-ceti-dariana`
3. Visibilidade: **Public** (necessário para PWABuilder grátis) ou Private
4. **Não** inicialize com README (você já tem os arquivos)
5. Clique em **Create repository**

Depois, no terminal da sua máquina:

```bash
cd ceti-dariana
git init
git add .
git commit -m "🚀 inicial: horário CETI DARIANA PWA"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/horario-ceti-dariana.git
git push -u origin main
```

---

### 2️⃣ Criar projeto no Firebase

1. Acesse [console.firebase.google.com](https://console.firebase.google.com)
2. Clique em **Adicionar projeto**
3. Nome: `ceti-dariana` (ou similar)
4. Google Analytics: opcional (pode desativar)
5. Aguarde a criação e clique em **Continuar**

---

### 3️⃣ Configurar Firebase Hosting

No terminal (com [Node.js](https://nodejs.org) instalado):

```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Fazer login
firebase login

# Inicializar no projeto (dentro da pasta ceti-dariana)
firebase use --add
# Selecione o projeto criado no passo 2
# Alias sugerido: default
```

Edite o arquivo `.firebaserc` substituindo `SEU-PROJECT-ID-AQUI` pelo ID real do seu projeto Firebase.

**Testar localmente:**
```bash
firebase serve --only hosting
# Acesse http://localhost:5000
```

**Deploy manual:**
```bash
firebase deploy --only hosting
```

---

### 4️⃣ Deploy automático via GitHub Actions

Para que cada `git push` faça deploy automático:

1. No [Console Firebase](https://console.firebase.google.com) → **Configurações do projeto** → **Contas de serviço**
2. Clique em **Gerar nova chave privada** → salve o JSON
3. No GitHub → seu repositório → **Settings** → **Secrets and variables** → **Actions**
4. Adicione os secrets:
   - `FIREBASE_SERVICE_ACCOUNT` → conteúdo do JSON baixado (todo o texto)
   - `FIREBASE_PROJECT_ID` → ID do seu projeto Firebase

Agora todo `git push` na branch `main` faz deploy automático! ✅

---

### 5️⃣ Gerar App no PWABuilder

Após o site estar no ar no Firebase:

1. Acesse [pwabuilder.com](https://pwabuilder.com)
2. Cole a URL do seu site Firebase (ex: `https://ceti-dariana.web.app`)
3. Clique em **Start** — o PWABuilder vai analisar o PWA
4. Na tela de resultados, clique em **Package for stores**
5. Escolha a plataforma:
   - **Android** → gera um APK / Android App Bundle para Google Play
   - **iOS** → gera pacote para App Store
   - **Windows** → gera pacote para Microsoft Store
6. Siga as instruções específicas de cada plataforma

> 💡 **Dica:** Para Android, o PWABuilder usa TWA (Trusted Web Activity) — o app fica leve e sempre atualizado.

---

## 📱 Funcionalidades PWA

- ✅ Instalável em Android, iOS, Windows, Mac
- ✅ Funciona offline (cache via Service Worker)
- ✅ Ícones nativos
- ✅ Abre em tela cheia (sem barra do navegador)
- ✅ Tema escuro como padrão do sistema
- ✅ Shortcuts no ícone (Segunda-feira / Hoje)

---

## 🔗 URLs após deploy

- **Firebase Hosting:** `https://SEU-PROJECT-ID.web.app`
- **Domínio customizado:** configure em Firebase → Hosting → Adicionar domínio

---

## 🆘 Problemas comuns

| Problema | Solução |
|---|---|
| SW não registra | Verifique se o site está em HTTPS |
| Ícones não aparecem | Confira os caminhos em `manifest.json` |
| PWABuilder dá erro | Certifique-se que o manifest tem `start_url` e ícones PNG válidos |
| Deploy falha | Confira os secrets no GitHub e o project ID no `.firebaserc` |
