import axios from "axios";
import { Router } from "express";
import { charsMock } from "./mocks/chars.mock";
import dayjs from "dayjs";

require("dotenv/config");

const router = Router();

router.get("/", async (_, res) => {
    try {
        // const infoChars = charsMock.map(async (char) => {
        //     const {
        //         data: {
        //             characters: { character },
        //         },
        //     } = await axios.get(
        //         `https://api.tibiadata.com/v3/character/${char}`
        //     );

        //     return await character;
        // });

        let chars: any = [];

        for (let x in charsMock) {
            const {
                data: {
                    characters: { character },
                },
            } = await axios.get(
                `https://api.tibiadata.com/v3/character/${charsMock[x]}`
            );

            chars.push(character);
        }

        let html: string =
            '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">';
        html +=
            "<div class='col-8 container mt-4'><table class='table table-sm table-bordered table-responsive table-hover table-striped mt-2 ml-2'>";
        html += "<thead class='thead-dark'>";
        html += "<tr>";
        html += "<th>Name</th>";
        html += "<th>Vocation</th>";
        html += "<th>Level</th>";
        html += "<th>Min level to Party</th>";
        html += "<th>Max level to Party</th>";
        html += "<th>Last login</th>";
        html += "<th>Premium Account</th>";
        html += "</tr>";
        html += "</thead><tbody>";

        chars.sort((a, b) => b.level - a.level);

        for (let x in chars) {
            html += `<tr><td>${chars[x].name}</td>`;
            html += `<td>${chars[x].vocation}</td>`;
            html += `<td class='text-center bg-secondary text-light'>${chars[x].level}</td>`;
            html += `<td class='text-center bg-warning'>${Math.floor(
                (chars[x].level / 3) * 2
            )}</td>`;
            html += `<td class='text-center bg-primary text-light'>${
                chars[x].level + Math.floor(chars[x].level / 2 + 1)
            }</td>`;
            html += `<td style='text-align:center'>${dayjs(
                chars[x].last_login
            ).format("DD/MM/YYYY HH:mm:ss")}</td>`;

            if (chars[x].account_status === "Premium Account") {
                html += `<td class='text-center bg-success text-light'>Sim</td></tr>`;
            } else {
                html += `<td class='text-center bg-danger text-light'>Não</td></tr>`;
            }
        }

        html += "</tdbody></table></div>";

        res.send(html);
    } catch (error) {
        res.send({ message: "Erro ao importar os dados" });
    }
});

export { router };
