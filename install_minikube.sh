# instalacao do CRI-O container runtime
CRIO_VERSION=$1
. /etc/os-release
echo "deb https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/x${NAME}_${VERSION_ID}/ /" | sudo tee /etc/apt/sources.list.d/devel:kubic:libcontainers:stable.list

echo "deb http://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable:/cri-o:/${CRIO_VERSION}/x${NAME}_${VERSION_ID}/ /" | sudo tee /etc/apt/sources.list.d/devel:kubic:libcontainers:stable:cri-o:${CRIO_VERSION}.list

curl -L https://download.opensuse.org/repositories/devel:kubic:libcontainers:stable:cri-o:${CRIO_VERSION}/x${NAME}_${VERSION_ID}/Release.key | apt-key add 
curl -L https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/x${NAME}_${VERSION_ID}/Release.key | apt-key add -

sudo apt update
sudo apt install cri-o cri-o-runc


echo "verificando se o kubectl esta instalado"
type -p kubectl #checa se o kubectl existe sem imprimir nada na tela
if [ $? -eq 1 ] 
then
#instalar kubectl
fi
