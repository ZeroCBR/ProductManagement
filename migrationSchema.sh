# !/bin/bash -e
dotnet tool install --global dotnet-ef --version 3.1.16
export PATH="$PATH:$HOME/.dotnet/tools"

export ASPNETCORE_ENVIRONMENT="Migration"
cd ./src/ProductManagement.Data.EF
dotnet ef database update --startup-project ../ProductManagement.Api/ --context ProductManagementDbContext --verbose
