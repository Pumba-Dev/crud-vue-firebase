import axios from "axios";

const https = axios.create({
    baseURL: 'https://viacep.com.br/ws/'
});

export function consultCEP(cep) {
    return https.get(`${cep}/json/`);
}