import app from "./app";
import { createDataBase } from "./infrastructure/createDb";

const PORTA = 3000;

app.listen(PORTA, async () => {
    await createDataBase();
    console.log(`Servidor rodando em: http://localhost:${PORTA}`)
})