# WSL2 + Podman: Uma alternativa ao Docker Desktop

Contém o exemplo de build de container do post [WSL2 + Podman: Uma alternativa ao Docker Desktop](https://dev.to/poveda/wsl2-podman-uma-alternativa-ao-docker-desktop-5cd6)

## Projeto Jurídico

Projeto criado a muitos anos para auxiliar os advogados do escritório de advocacia que trabalhei. Ele já teve diversas versões e adaptações. A versão original foi construida em .NET framework 3.5 com WebForms.
Normalmente utilizo este projeto do juridico para treinar conceitos e aprender linguagens novas com um problema real.

### Sobre esta versão do Jurídico
Esta versão é uma versão muito simplificada do programa original (somente o CRUD dos processos). O objetivo desta versão é mostrar o funcionamento de um build multistage para docker e podman

## Script de instalação do podman

Ficou com preguiça de ler o post ou de copiar todos os comandos?
Executa o install_podman.sh :smile: 

Pelo powershell
```powershell
wsl exec sh ./install_podman.sh
```

Dentro da distro
```sh
sh install_podman.sh
```