# Set the registry and image name
$registry="192.168.178.21:5000"
$image="text-snippets"

# Build docker image
docker build -t "${registry}/${image}:latest" .
