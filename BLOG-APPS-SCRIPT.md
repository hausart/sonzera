# Blog via Google Sheets

## 1. Prepare a planilha

Crie uma aba chamada `Posts` com a primeira linha usando estes nomes:

`slug | title | excerpt | content | image | date | category | published`

Use `published` como `TRUE` ou `FALSE`. Em `image`, informe um endereço público de imagem ou um caminho relativo que exista no site, como `assets/banner1.jpg`.

## 2. Publique o Apps Script

Abra `apps-script-blog.gs`, troque `COLE_AQUI_O_ID_DA_PLANILHA` pelo ID da planilha e publique como Web App. O acesso precisa permitir que o site consulte o endpoint.

## 3. Aponte o site para o endpoint

Em `blog.html`, preencha o atributo `content` da meta tag `sonzera-blog-api` com a URL `/exec` do Web App:

```html
<meta name="sonzera-blog-api" content="https://script.google.com/macros/s/SEU_ID/exec" />
```

Sem essa URL, a página usa `blog-data.json` automaticamente. A resposta aceita tanto uma lista direta quanto `{ "posts": [...] }`.
