const axios = require("axios");
const cheerio = require("cheerio");


class Controller {
    async getAllval(req, res) {
        try {
            axios.get("https://cbr.ru/currency_base/daily/").then(response => {
                const $ = cheerio.load(response.data);
                const massCycle = [];
                const Tagslength = $("#content > div > div > div > div.table-wrapper > div > table > tbody > tr").length;
                for (let i = 2; i < Tagslength + 1; i++) {
                    const obj = {
                        valCode: $(`#content > div > div > div > div.table-wrapper > div > table > tbody > tr:nth-child(${i}) > td:nth-child(1)`).text(),
                        symbolCode: $(`#content > div > div > div > div.table-wrapper > div > table > tbody > tr:nth-child(${i}) > td:nth-child(2)`).text(),
                        units: $(`#content > div > div > div > div.table-wrapper > div > table > tbody > tr:nth-child(${i}) > td:nth-child(3)`).text(),
                        nameVal: $(`#content > div > div > div > div.table-wrapper > div > table > tbody > tr:nth-child(${i}) > td:nth-child(4)`).text(),
                        Well: $(`#content > div > div > div > div.table-wrapper > div > table > tbody > tr:nth-child(${i}) > td:nth-child(5)`).text()
                    }
                    massCycle.push(obj)
                }
                res.json(massCycle)
            })

        } catch (e) {
            console.log(e);
        }
    }
    async postOneVal(req, res) {
        try {
            if (typeof req.body.nameCurrency === "undefined") {
                res.send('Поле "nameCurrency" в теле запроса не найдено');
                return;
            }
            const nameCurrency = req.body.nameCurrency;
            let massUser = [];
            axios.get("https://cbr.ru/currency_base/daily/").then(response => {
                const $ = cheerio.load(response.data);
                const massCycle = [];
                const Tagslength = $("#content > div > div > div > div.table-wrapper > div > table > tbody > tr").length;
                for (let i = 2; i < Tagslength + 1; i++) {
                    const obj = {
                        valCode: $(`#content > div > div > div > div.table-wrapper > div > table > tbody > tr:nth-child(${i}) > td:nth-child(1)`).text(),
                        symbolCode: $(`#content > div > div > div > div.table-wrapper > div > table > tbody > tr:nth-child(${i}) > td:nth-child(2)`).text(),
                        units: $(`#content > div > div > div > div.table-wrapper > div > table > tbody > tr:nth-child(${i}) > td:nth-child(3)`).text(),
                        nameVal: $(`#content > div > div > div > div.table-wrapper > div > table > tbody > tr:nth-child(${i}) > td:nth-child(4)`).text(),
                        Well: $(`#content > div > div > div > div.table-wrapper > div > table > tbody > tr:nth-child(${i}) > td:nth-child(5)`).text()
                    }
                    massCycle.push(obj)
                }

                for (const item of massCycle) {
                    if (item.symbolCode === nameCurrency.toUpperCase() || item.nameVal === nameCurrency) {
                        massUser.push(item)
                    }
                }
                if (typeof massUser[0] === "undefined") {
                    res.send("Валюта не найдена");
                    return;
                }
                res.json(massUser);
            })
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new Controller();