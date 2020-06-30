//Função para tratar a idade do instrutor
module.exports = {
    age(timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)

        //calculo de idade
        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()

        if (month <= 0 && today.getMonth() <= birthDate.getMonth())
            age = age - 1
        
        return age
    },

    date(timestamp) {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)
        
        //enviar no formato yyyy-mm-dd
        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`,
            format: `${day}/${month}/${year}`
        }

    }
}

    