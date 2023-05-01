const context = require('./database'); // Connection Modülümüz.

//Öğrenci Sınıfmız
var TableName = "studentnote";
class Ogrenci {
    constructor(isim, soyisim, numara) {
        this.isim = isim;
        this.soyisim = soyisim
        this.numara = numara;
    }

    AddNote(Vize, Final, Butunleme = 0) {
        var ortalama = (Vize * 0.4 + Final * 0.6);
        if (ortalama >= 50) {
            try {
                context.query(`Insert into ${TableName} (name,lastname,number,vize,final,ortalama) values (
                    '${this.isim}',
                    '${this.soyisim}',
                    ${this.numara},
                    ${Vize},
                    ${Final},
                    ${ortalama}
                    )`);
            } catch (error) {
                console.log(error);
            }
        }
        else {
            var ortalama = (Vize * 0.4  + Butunleme * 0.6);

            context.execute(`Insert into ${TableName} (name,lastname,number,vize,final,ortalama,butunleme) values (
                '${this.isim}',
                '${this.soyisim}',
                '${this.numara}',
                ${Vize},
                ${Final},
                ${ortalama},
                ${Butunleme}
                )`);
            context.commit();
        }
        context.commit();

    }
    UpdateNote(Vize, Final,number,Butunleme = 0) {
        let ort = (Vize * 0.4 + Final * 0.6);
        if (ort<= 50) {
             ort = (Vize * 0.4 + Butunleme * 0.6);
        }
        context.execute(`UPDATE ${TableName}  SET 
            name = '${this.isim}',
            lastname = '${this.soyisim}',
            number = '${this.numara}',
            vize = ${Vize},
            final = ${Final},
            ortalama = ${ort},
            update_date = '${new Date().toLocaleString()}',
            butunleme = ${Butunleme} where number = ${number}`);
            context.commit();
    }
    DeleteNote(number) {
        context.execute(`DELETE FROM ${TableName} where number = ${number}`);
        context.commit();
    }
    GetList() {
        context.query(`SELECT * FROM ${TableName}`, (err, res) => {
            if (res) {
                console.log(res);
            }
            else {
                console.log(err);
            }
        });

    }
    GetById(number){
        context.query(`SELECT * FROM ${TableName} where number = ${number}`,(req,res)=>{
            if (res) {
                console.log(res);
            }
            else {
                console.log(req);
            }
        });
    }

}

module.exports = Ogrenci;