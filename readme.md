# WSL2 + Podman: Uma alternativa ao Docker Desktop

Contém o exemplo de build de container do post [WSL2 + Podman: Uma alternativa ao Docker Desktop](https://dev.to/poveda/wsl2-podman-uma-alternativa-ao-docker-desktop-5cd6) e os scripts de instalação do post [Podman + minikube](https://dev.to/poveda/podman-minikube-32e2)

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

## Efetuando o build da imagem

Para efetuar o build da imagem execute o comando abaixo:

```sh
podman build -t juridico -f dockerfile.multistaging .
```

Após o build estar completo é possível verificar o resultado rodando o comando:

```sh
podman images | grep juridico
```

O resultado gerado deve ser algo parecido com:

```sh
localhost/juridico latest 1861fa76b7ab 3 months ago 201 MB
```

## Executando o programa

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

## Executar o minikube

Com tudo instalado basta rodar o comando abaixo dentro do WSL

```sh
minikube start --driver=podman --container-runtime=cri-o
```

## Efetuar o deploy da aplicação

O primeiro passo é [fazer o build da imagem](#efetuando-o-build-da-imagem) e em seguida subir a imagem para um repositório de imagens ou carregá-la diretamente no minikube.

No post [Podman + minikube](https://dev.to/poveda/podman-minikube-32e2) optei pela abordagem de subir direto no minikube. Para fazer esse procedimento é preciso rodar 2 comandos:

- Exportar a imagem para um arquivo .tar:
  
  ```sh
  podman save -o juridico.tar localhost/juridico:latest
  ```

- Carregar a imagem no minikube:
  
  ```sh
  minikube image load juridico.tar
  ```

Após a imagem já estar disponível para ser baixada pelo minikube é possível efetuar o deployment com o comando:

```sh
kubectl apply -f deployment_files/deployment.yaml
```

E a configuração da service:

```sh
kubectl apply -f deployment_files/service.yaml
```

## Expondo a aplicação para o host

Com toda a aplicação configurada dentro do kubernetes, o próximo passo é expor a aplicação para a máquina host, caso contrário ela estará acessível somente dentro do WSL.
Para expor a aplicação o comando rode o comando abaixo:

```sh
kubectl port-forward service/juridico-deployment 3001:3001
```
