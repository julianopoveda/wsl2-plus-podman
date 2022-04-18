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
wsl exec sh ./scripts/install_podman.sh
```

Dentro da distro

```sh
sh scripts/install_podman.sh
```

## Scripts de instalação do ecossistema minikube + podman

Para tornar o ambiente minikube com o podman minimamente viável, é necessário instalar uma série de ferramentas além do próprio minikube. A instalação de cada ferramenta necessária foi separada em um script. Desta forma é possível instalar somente o componente que está faltando.

A exceção do script de instalação do CRI-O, todos seguem a mesma forma de execução do script de instalação do podman:

Pelo powershell

```powershell
wsl exec sh ./scripts/install_<ferramenta>.sh
```

Dentro da distro

```sh
sh scripts/install_<ferramenta>.sh
```

No caso do script de instalação do CRI-O é necessário passar a versão do CRI-O que deseja-se instalar (as versões podem ser consultadas [aqui](https://github.com/cri-o/cri-o#compatibility-matrix-cri-o--kubernetes)). Para executar o script:

Pelo powershell

```powershell
wsl exec sh ./scripts/install_crio.sh 1.23
```

Dentro da distro

```sh
sh scripts/install_crio.sh 1.23
```

<!-- Adicionar aqui o comando completo para executar o minikube com todos os add-ons habilitados -->