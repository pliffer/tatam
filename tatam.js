const request = require('request');

let Tatam = {

    delay: 4,
    minlvl: 5,

    _interval: null,

    lvl: 0,

    blocked: false,

    data: "",

    blocked_interval: null,

    start(){

        Tatam.restartTimer();

    },

    restartTimer(){

        clearInterval(Tatam.blocked_interval);

        Tatam.blocked_interval = setInterval(function(){

            Tatam.blocked = false;

        }, 1000);

        clearInterval(Tatam._interval);

        Tatam._interval = setInterval(function(){

            if(Tatam.lvl >= Tatam.minlvl){

                Tatam.achieved(Tatam.lvl, Tatam.data);

            }

            Tatam.lvl  = 0;
            Tatam.data = '';

        }, 1000 * Tatam.delay);

    },

    achieved(lvl, data){

        console.log(`Conseguiu cumprir nível: ${lvl}`);

        request.post({

            url: 'https://astr.me/api/lunastro',
            json: {

                jwt: Tatam.jwt,

                data: {
                    action: 'create_child',
                    label: `Conseguiu cumprir nível ${lvl}`,
                    description: data
                }

            }

        }, (err, body, res) => {

            if(err){

                console.log('não foi enviado');

                throw err;

            } else console.log('enviados com sucesso');

        });

    },

    trigger(v){

        Tatam.restartTimer();

        if(Tatam.blocked) return;

        Tatam.blocked = true;

        console.log('Trigger!', v);

        Tatam.data += `{${new Date().getTime()}: ${v}}\n`;

        Tatam.lvl++;

        Tatam.update();

    },

    update(){

        if(Tatam.lvl > Tatam.minlvl){

            console.log(`Wow, ${Tatam.lvl} seguidos`);

        }

    }

}

module.exports = Tatam;