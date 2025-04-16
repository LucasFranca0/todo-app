FROM node:18-alpine

WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala as dependências do Node.js
RUN npm install

# Instala o tzdata (APK para Alpine) e configura o fuso horário
RUN apk add --no-cache tzdata && \
    ln -sf /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime && \
    echo "America/Sao_Paulo" > /etc/timezone

# Define a variável de ambiente TZ (opcional, mas recomendado)
ENV TZ=America/Sao_Paulo

# Copia o restante dos arquivos do projeto
COPY . .

# Expõe a porta do servidor de desenvolvimento
EXPOSE 3000

# Inicia o servidor de desenvolvimento
CMD ["npm", "start"]