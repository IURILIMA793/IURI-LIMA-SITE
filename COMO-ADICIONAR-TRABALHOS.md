# Como adicionar um trabalho ao portfólio

Os trabalhos do portfólio ficam no arquivo [`projects.json`](./projects.json).
Ele usa o formato JSON padrão, que não permite comentários dentro do arquivo.
Por isso, este guia explica cada campo em português do Brasil. Não adicione
comentários `//` ou `/* ... */` ao JSON: isso impede o site de carregar os
trabalhos.

## Campos de um trabalho

- `id`: identificador único, escrito em letras minúsculas, números e hífens.
  Não use espaços, acentos ou repita um identificador existente.
- `title`: título que aparece na página.
- `layout`: estilo de apresentação. Use `event` para o layout de evento ou
  `gallery` para o layout de galeria.
- `paragraphs`: lista com um ou mais textos descritivos.
- `quote`: campo opcional para uma citação ou observação em destaque.
- `media`: lista com uma ou mais imagens ou vídeos.
- `media[].type`: use `image` para imagem ou `video` para vídeo.
- `media[].src`: caminho do arquivo de mídia, relativo à pasta do site.
- `media[].alt`: descrição acessível do conteúdo da imagem ou do vídeo.

## Exemplo completo

Copie este objeto para dentro da lista em `projects.json`, depois do último
trabalho existente e **antes do `]` que fecha a lista**. Coloque uma vírgula
após o objeto anterior. O novo trabalho não pode ficar depois do `]`:

```json
{
  "id": "festival-exemplo-2026",
  "title": "Festival Exemplo 2026",
  "layout": "event",
  "paragraphs": [
    "Fui responsável pela montagem e operação dos painéis de LED do evento.",
    "O sistema foi configurado para exibir os conteúdos do palco principal."
  ],
  "quote": "Uma observação opcional que aparecerá em destaque.",
  "media": [
    {
      "type": "image",
      "src": "1-imagens/festival-exemplo-palco.jpg",
      "alt": "Painéis de LED no palco do Festival Exemplo"
    },
    {
      "type": "video",
      "src": "1-videos/festival-exemplo.mp4",
      "alt": "Vídeo mostrando o palco durante o Festival Exemplo"
    }
  ]
}
```

Os caminhos em `src` precisam corresponder a arquivos que existam no projeto.
Coloque as imagens em `1-imagens/` e os vídeos em `1-videos/`, ou ajuste os
caminhos para a pasta em que os arquivos estiverem.

## Onde inserir

O arquivo `projects.json` contém uma lista entre colchetes (`[` e `]`). Cada
trabalho é um objeto dentro dessa lista. Para adicionar um, coloque uma vírgula
depois da chave `}` que fecha o último trabalho atual, cole o novo objeto logo
abaixo e deixe o `]` final depois do novo objeto. Por exemplo:






## lembre de colocar virgula no ultimo conchete antes de add outro trabalho. e o ultimo trabalho nao leva virgula para finalizar. //IURI



```json
[
  {
    "id": "trabalho-existente",
    "title": "Trabalho existente",
    "layout": "gallery",
    "paragraphs": ["Descrição do trabalho existente."],
    "media": [
      {
        "type": "image",
        "src": "1-imagens/trabalho-existente.jpg",
        "alt": "Descrição da imagem do trabalho existente"
      }
    ]
  },
  {
    "id": "festival-exemplo-2026",
    "title": "Festival Exemplo 2026",
    "layout": "event",
    "paragraphs": ["Descrição do novo trabalho."],
    "media": [
      {
        "type": "image",
        "src": "1-imagens/festival-exemplo-palco.jpg",
        "alt": "Palco do Festival Exemplo"
      }
    ]
  }
]
```

Neste exemplo reduzido, o segundo objeto representa o novo trabalho. No arquivo
real, mantenha todos os trabalhos que já existem. O site mostra primeiro o
trabalho que estiver por último na lista.

Depois de salvar o JSON e adicionar os arquivos de mídia, recarregue o site. Se
o trabalho não aparecer, confira se o JSON está válido, se o `id` é único e se
todos os caminhos de mídia estão corretos.

## Escolher uma imagem de fundo para cada tema

As imagens de fundo ficam configuradas em `style.css`. Na área dos trabalhos,
a imagem ocupa a janela do navegador inteira e permanece fixa enquanto os
trabalhos passam por cima, com um leve desfoque. A mesma imagem continua parada
durante todos os trabalhos. Ela mantém a proporção original, fica centralizada
e, em janelas menores, pode ser cortada nas bordas para preencher a tela. O
fundo fica limitado à área dos trabalhos e não aparece nas secções seguintes.
Para trocar a imagem, coloque o arquivo na pasta `1-imagens/` e altere a URL no
tema desejado. Por exemplo, para o tema de Natal, localize
`:root[data-theme="natal"]`:

```css
--theme-background-image: url("1-imagens/fundo-natal.jpeg");
```

Para remover a imagem desse tema, defina a variável como `none`. A mesma opção
está disponível separadamente nos blocos `:root` (tema padrão) e
`:root[data-theme="pascoa"]` (tema de Páscoa), permitindo configurar uma imagem
diferente para cada tema.

O tema que aparece no site continua sendo selecionado em `index.html`, no
atributo `data-theme` do elemento `<html>`. Salve os arquivos e atualize a
página para ver a alteração.
