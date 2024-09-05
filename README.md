# Instrucciones

## instalación
1. Clonar el repositorio
```
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
```

2. instalar dependencias
```
npm install
```

## Configuracion
1. crear archivo .env en la raiz del proyecto con las siguientes variables
```
ROOTAPI_URL= #url backend origen
ROOTAPI_TOKEN= #token backend origen

ENTERPRISE_ID= #Id numerica de la empresa creada en el nuevo backend(esto es con el fin de crear la relacion con los reportes a subir)

OUTAPI_URL=#url backend destino
OUTAPI_TOKEN=#token backend destino

```

**Importante tener los permisos necesarios. (find, findone para entrerprise y los permisos relacionados a upload)**