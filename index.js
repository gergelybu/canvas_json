$(function () {
  let JOBS = "jobs.json";
  readData(JOBS, processList);

  $("canvas").drawImage({
    layer: true,
    source: "./bg/city.png",
    x: 0,
    y: 0,
    width: 400,
    height: 300,
    fromCenter: false,
  });

  $("canvas").drawImage({
    layer: true,
    source: "./char/warrior.png",
    x: 300,
    y: 150,
  });

  $("canvas").drawImage({
    layer: true,
    source: "./char/goblin.png",
    x: 100,
    y: 140,
  });

  $("canvas").drawRect({
    layer: true,
    name: "stats",
    fillStyle: "#0f03b4",
    strokeStyle: "#fff",
    strokeWidth: 4,
    cornerRadius: 10,
    x: 200,
    y: 250,
    width: 400,
    height: 100,
  });

  $("canvas").drawRect({
    layer: true,
    name: "commands",
    fillStyle: "#0f03b4",
    strokeStyle: "#fff",
    strokeWidth: 4,
    cornerRadius: 10,
    x: 50,
    y: 250,
    width: 100,
    height: 100,
  });

  $("canvas").drawText({
    layer: true,
    fillStyle: "#fff",
    x: 50,
    y: 220,
    fontSize: 15,
    fontFamily: "Verdana, sans-serif",
    text: "Attack",
    click: function (layer) {
      readData(JOBS, attack);
    },
  });

  $("canvas").drawText({
    layer: true,
    fillStyle: "#fff",
    x: 50,
    y: 240,
    fontSize: 15,
    fontFamily: "Verdana, sans-serif",
    text: "Defend",
    click: function (layer) {
      console.log("This feature is under construction!");
    },
  });

  $("canvas").drawText({
    layer: true,
    fillStyle: "#fff",
    x: 50,
    y: 260,
    fontSize: 15,
    fontFamily: "Verdana, sans-serif",
    text: "Item",
    click: function (layer) {
      console.log("This feature is under construction!");
    },
  });

  $("canvas").drawRect({
    layer: true,
    name: "message",
    fillStyle: "#0f03b4",
    strokeStyle: "#fff",
    strokeWidth: 4,
    cornerRadius: 10,
    x: 200,
    y: 25,
    width: 400,
    height: 50,
  });
});

function processList(data) {
  let list = data;
  console.log(list);
}

function attack() {
  let jobs = "jobs.json";
  let monster = "monsters.json";
  console.log("Battle commencing!");

  Promise.all([fetch(jobs), fetch(monster)])
    .then(function (responses) {
      return Promise.all(
        responses.map(function (response) {
          return response.json();
        })
      );
    })
    .then(function (data) {
      let jobsData = data[0].jobs;
      let monstersData = data[1].monsters;

      let fighterJobs = jobsData.filter((job) => job.job === "fighter");
      let goblinData = monstersData.filter(
        (monster) => monster.monster === "goblin"
      );
      let toHit = 0;
      let toDmg = 0;
      let toCrit = 0;
      let toDodge = 0;
      let toDef = 0;
      let damage = 0;
      let critDmg = 0;
      //do {
      $("canvas").removeLayer("battleText").drawLayers();
      toHit = Math.floor(Math.random() * 11) + fighterJobs[0].accuracy;
      toDmg = Math.floor(Math.random() * 11) + fighterJobs[0].attack;
      toCrit = Math.floor(Math.random() * 100) + fighterJobs[0].crit;
      toDodge = Math.floor(Math.random() * 11) + goblinData[0].evasion;
      toDef = Math.floor(Math.random() * 11) + goblinData[0].defense;
      damage = toDmg - toDef + 1;
      $("canvas").drawImage({
        layer: true,
        name: "sword",
        source: "./char/sword_empty.png",
        width: 50,
        height: 75,
        x: 300,
        y: 100,
        //rotate: 100,
      });
      $("canvas").animateLayer(
        "sword",
        {
          x: 300,
          y: 100,
          width: 100,
          height: 50,
        },
        1000,
        function (layer) {
          // Callback function
          $(this).animateLayer(
            layer,
            {
              x: 100,
              y: 140,
              rotate: 180,
            },
            "slow",
            "swing"
          );
        }
      );
      $("canvas").animateLayer(
        "sword",
        {
          x: 300,
          y: 100,
          width: 100,
          height: 50,
        },
        1000,
        function (layer) {
          $(this).animateLayer(
            layer,
            {
              x: 300,
              y: 100,
              rotate: 360,
            },
            "slow",
            "swing"
          );
        }
      );

      if (damage <= 0) {
        damage = fighterJobs[0].attack;
      }
      critDmg = (damage - toDef) * 2 + 1;
      if (toCrit > 99) {
        console.log(fighterJobs[0].job + " CRITICAL HIT!!!");
        console.log(fighterJobs[0].job + " dealt: " + critDmg);
        $("canvas").drawText({
          layer: true,
          name: "battleText",
          fillStyle: "#fff",
          x: 200,
          y: 25,
          fontSize: 15,
          fontFamily: "Verdana, sans-serif",
          text: "Critical hit! Damage: " + critDmg,
        });

        goblinData[0].current_hp -= critDmg;
        console.log(goblinData[0].current_hp);
      } else if (toHit >= toDodge) {
        console.log(fighterJobs[0].job + " hit with the attack!");
        console.log(fighterJobs[0].job + " dealt: " + damage);
        $("canvas").drawText({
          layer: true,
          name: "battleText",
          fillStyle: "#fff",
          x: 200,
          y: 25,
          fontSize: 15,
          fontFamily: "Verdana, sans-serif",
          text: "Hit! Damage: " + damage,
        });
        goblinData[0].current_hp -= damage;
        console.log(goblinData[0].current_hp);
      } else {
        console.log(fighterJobs[0].job + " missed the attack!");
        console.log(goblinData[0].current_hp);
        $("canvas").drawText({
          layer: true,
          name: "battleText",
          fillStyle: "#fff",
          x: 200,
          y: 25,
          fontSize: 15,
          fontFamily: "Verdana, sans-serif",
          text: "Miss!",
        });
      }

      toHit = Math.floor(Math.random() * 11) + goblinData[0].accuracy;
      toDmg = Math.floor(Math.random() * 11) + goblinData[0].attack;
      toCrit = Math.floor(Math.random() * 100) + goblinData[0].crit;
      toDodge = Math.floor(Math.random() * 11) + fighterJobs[0].evasion;
      toDef = Math.floor(Math.random() * 11) + fighterJobs[0].defense;
      damage = toDmg - toDef + 1;
      if (damage <= 0) {
        damage = goblinData[0].attack;
      }
      critDmg = (damage - toDef) * 2 + 1;
      if (toCrit > 99) {
        console.log(goblinData[0].monster + " CRITICAL HIT!!!");
        console.log(goblinData[0].monster + " dealt: " + critDmg);
        fighterJobs[0].current_hp -= critDmg;
        console.log(fighterJobs[0].current_hp);
      } else if (toHit >= toDodge) {
        console.log(goblinData[0].monster + " hit with the attack!");
        console.log(goblinData[0].monster + " dealt: " + damage);
        fighterJobs[0].current_hp -= damage;
        console.log(fighterJobs[0].current_hp);
      } else {
        console.log(goblinData[0].monster + " missed the attack!");
        console.log(fighterJobs[0].current_hp);
      }
      //} while (fighterJobs[0].current_hp >= 0 && goblinData[0].current_hp >= 0);
      if (fighterJobs[0].current_hp > goblinData[0].current_hp) {
        console.log(fighterJobs[0].job + " won the fight!");
      } else {
        console.log(goblinData[0].job + " won the fight!");
      }
    })

    .catch(function (error) {
      console.log(error);
    });
}

function readData(JOBS, callbackFc, myData) {
  fetch(JOBS, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      callbackFc(data);
    })
    .catch((error) => console.log(error));
}
