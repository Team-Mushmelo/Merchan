import Criar from './Criar';
import Login from './Login';

import { useState } from 'react';

export default function PaginaLogar({ setIsLogado }) {

    const [isCriarConta, setIsCriarConta] = useState(false);
    if (!isCriarConta) {
        return (
            <Login setIsLogado={setIsLogado} setIsCriarConta={setIsCriarConta}/>
        );
    } else {
        return (
            <Criar setIsLogado={setIsLogado}  setIsCriarConta={setIsCriarConta}/>
        );
    }


}