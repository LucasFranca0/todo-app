# Todo App

Este é um aplicativo de tarefas desenvolvido com Spring Boot. O objetivo deste projeto é fornecer uma aplicação simples para gerenciar tarefas, permitindo criar, visualizar, atualizar e excluir tarefas.

## Estrutura do Projeto

### Backend

O backend é desenvolvido em Java utilizando o framework Spring Boot. Ele é responsável por fornecer uma API RESTful para o frontend consumir.

#### Pacotes

- `controller`: Contém os controladores REST que expõem os endpoints da API.
- `dto`: Contém os Data Transfer Objects (DTOs) usados para transferir dados entre o cliente e o servidor.
- `mapper`: Contém as classes de mapeamento entre entidades e DTOs.
- `model`: Contém as entidades JPA que representam as tabelas do banco de dados.
- `repository`: Contém os repositórios JPA para acesso ao banco de dados.
- `service`: Contém as classes de serviço que implementam a lógica de negócios.

#### Classes

##### `TaskController`

- `@RestController`: Indica que esta classe é um controlador REST.
- `@RequestMapping("/api/tasks")`: Define o caminho base para todos os endpoints deste controlador.
- `@PostMapping`: Mapeia requisições HTTP POST para o método.
- `@GetMapping`: Mapeia requisições HTTP GET para o método.
- `@PutMapping`: Mapeia requisições HTTP PUT para o método.
- `@DeleteMapping`: Mapeia requisições HTTP DELETE para o método.
- `@ResponseStatus(HttpStatus.CREATED)`: Define o status HTTP de resposta como 201 Created.
- `@Valid`: Indica que o objeto deve ser validado.
- `@RequestBody`: Indica que o corpo da requisição deve ser convertido para o objeto especificado.
- `@PathVariable`: Indica que o valor da variável de caminho deve ser passado para o método.

##### `TaskService`

- `@Service`: Indica que esta classe é um serviço Spring.
- `@Transactional`: Indica que os métodos desta classe devem ser executados dentro de uma transação.

##### `TaskRequestDTO`

- `@NotBlank(message = "O título é obrigatório")`: Valida que o campo `title` não pode ser vazio.
- `@NotNull(message = "A data de vencimento é obrigatória")`: Valida que o campo `dueDate` não pode ser nulo.

##### `TaskMapper`
- `@Mapper`: Indica que esta interface é um mapper do MapStruct.
- `@Mapping`: Define como os campos devem ser mapeados entre a entidade e o DTO.
- `@Mapping(target = "id", ignore = true)`: Ignora o campo `id` ao mapear de `TaskRequestDTO` para `Task`.

## Como Executar

### Pré-requisitos

- Java 17
- Maven 3.8.4
- Docker 20.10.8
- Docker Compose 1.29.2

### Docker

1. Navegue até o diretório raiz do projeto:
   ```sh
   cd ..
2. Remover contêineres e volumes existentes
   ```sh
   docker-compose down -v
   ```
2. Construa e inicie os contêineres Docker
    ```sh
   docker-compose up --build
   ```
3. Acesse o aplicativo em seu navegador:
   ```sh
    http://localhost:8080
    ```
### Comandos Docker

- Para parar os contêineres:
  ```sh
  docker-compose down
  ```
- Para remover os contêineres e volumes:
  ```sh
    docker-compose down -v
    ```
- Para acessar o contêiner do banco de dados:
  ```sh
  docker exec -it todoapp-db psql -U postgres
  ```
- Para acessar o contêiner do backend:
  ```sh
    docker exec -it todoapp-backend bash
    ```
### Endpoints da API
| Método | Endpoint                | Descrição                          |
|--------|-------------------------|------------------------------------|
| POST   | /api/tasks              | Cria uma nova tarefa               |
| GET    | /api/tasks              | Lista todas as tarefas             |
| GET    | /api/tasks/{id}         | Obtém uma tarefa específica         |
| PUT    | /api/tasks/{id}         | Atualiza uma tarefa específica      |
| DELETE | /api/tasks/{id}         | Remove uma tarefa específica        |





   