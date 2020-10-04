# Set the registry and image name
$registry="192.168.178.21:5000"
$image="text-snippets"

# Read the current version
$version = (Get-Content package.json) -join "`n" | ConvertFrom-Json | Select -ExpandProperty "version"

# Tag the image
docker tag "${registry}/${image}:latest" "${registry}/${image}:${version}"

# Push the images
docker push "${registry}/${image}:latest"
docker push "${registry}/${image}:${version}"
