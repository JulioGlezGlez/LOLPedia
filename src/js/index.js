import Champion from "./Champion";
import FighterIcon from '../assets/images/Fighter_icon.png';
import TankIcon from '../assets/images/Tank_icon.png';
import MageIcon from '../assets/images/Mage_icon.png';
import SlayerIcon from '../assets/images/Slayer_icon.png';
import MarksmanIcon from '../assets/images/Marksman_icon.png';
import ControllerIcon from '../assets/images/Controller_icon.png';
import StatAbilityIcon from '../assets/images/statsIcon/Ability_power_icon.png';
import StatArmorIcon from '../assets/images/statsIcon/Armor_icon.png';
import StatSpellResistanceIcon from '../assets/images/statsIcon/Magic_resistance_icon.png';
import StatAttackDamageIcon from '../assets/images/statsIcon/Attack_damage_icon.png';
import StatAttackSpeedIcon from '../assets/images/statsIcon/Attack_speed_icon.png';
import StatHPRegenIcon from '../assets/images/statsIcon/Health_regeneration_icon.png';
import StatHPIcon from '../assets/images/statsIcon/Health_icon.png';
import StatManaIcon from '../assets/images/statsIcon/Mana_icon.png';
import StatManaRegenIcon from '../assets/images/statsIcon/Mana_regeneration_icon.png';

const statsIcons = {
    'Ability Power': StatAbilityIcon,
    'Armor': StatArmorIcon,
    'Spell Resistance': StatSpellResistanceIcon,
    'Attack Damage': StatAttackDamageIcon,
    'Attack Speed': StatAttackSpeedIcon,
    'HP Regen': StatHPRegenIcon,
    'HP': StatHPIcon,
    'Mana': StatManaIcon,
    'Mana Regen': StatManaRegenIcon
}


const tagIcons = {
    'Fighter': FighterIcon,
    'Tank': TankIcon,
    'Mage': MageIcon,
    'Assassin': SlayerIcon,
    'Marksman': MarksmanIcon,
    'Support': ControllerIcon
};

let champs = [];

async function getChamps() {
    const lolpedia = document.querySelector('.lolpedia');
    console.log(lolpedia);
    let aux = 0;
    try {
        const response = await fetch('https://ddragon.leagueoflegends.com/cdn/14.20.1/data/en_US/champion.json');
        const data = await response.json();
        for (let key in data.data) {
            let champ = data.data[key];
            champs.push(champ);
            let ch = new Champion(champ);
            let tags = [];

            ch.tags.forEach(tag => {
                if (tagIcons[tag]) {
                    tags.push(`<img class="image" src="${tagIcons[tag]}" alt="${tag}">`);
                } else {
                    console.warn(`Tag desconocido: ${tag}`);
                }
            });


            lolpedia.innerHTML += `
            <div class="champion-container">
                <div class="champion">
                  <div id=${aux} class="flex container">
                    <div class="champion-image">
                      <img src="https://ddragon.leagueoflegends.com/cdn/14.20.1/img/champion/${ch.chImageFull}" alt="${ch.chName}">
                    </div>
                    <div class="champion-info">
                      <div>
                        <h2>${ch.chName}</h2>
                        <p>${ch.chTitle}</p>
                      </div>
                      <div class="tags">
                        ${tags.join(' ')}
                      </div>
                    </div>
                  </div>
                </div>
                <div id=${ch.chName} class="modal">
                  <div class="modal-content">
                    <span id=${ch} class="close">&times;</span>
                    <div class="modal-information_stats">
                        <div class="modal-info">
                            <h1>${ch.chName}</h1>
                            <p>${ch.chTitle}</p>
                        </div>
                        <div class="stats">
                            <h2>Stats</h2>
                            <div class="stats_container">
                                <div class="stats_1">
                                     <p><img src="${statsIcons["HP"]}" alt="HP"> HP:${ch.stats.hp}</p>
                                     <p><img src="${statsIcons["Mana"]}" alt="Mana"> MP:${ch.stats.mp}</p>
                                     <p><img src="${statsIcons["Armor"]}" alt="Armor"> Armor:${ch.stats.armor}</p>
                                     <p><img src="${statsIcons["Attack Damage"]}" alt="Attack Damage"> Attack:${ch.stats.attackdamage}</p>
                                </div>
                                <div class="stats_2">
                                    <p><img src="${statsIcons["HP Regen"]}" alt="HP Regen"> HP Regen:${ch.stats.hpregen}</p>
                                    <p><img src="${statsIcons["Mana Regen"]}" alt="Mana Regen"> MP Regen:${ch.stats.mpregen}</p>
                                    <p><img src="${statsIcons["Spell Resistance"]}" alt="Spell Resistance"> MR:${ch.stats.spellblock}</p>
                                    <p><img src="${statsIcons["Attack Speed"]}" alt="Attack Speed"> Attack Speed:${ch.stats.attackspeed}</p>
                                </div>
                            </div>
                        </div>  
                    </div>
                    <div class="modal-lore">
                        <h1>Lore</h1>
                        <p>${ch.chLore}</p>
                    </div>
                    
                  </div>
                </div>
            </div>`;
            aux++;

        }
    } catch (e) {
        console.log(e);
        lolpedia.innerHTML = '<p>Error loading champions</p>';
    }

}

getChamps().then(() => {
    const container = document.querySelectorAll('.container');
    container.forEach((container) => {
        console.log(container.id);
        const modal = document.getElementById(champs[container.id].name);
        const modalContent = document.getElementsByClassName('modal-content')[container.id];
        const span = document.getElementsByClassName('close')[container.id];
        let skinIndex = 0;
        let skinInterval;
        container.addEventListener('click', async () => {
            const skinCount = await getChampSkin(champs[container.id]);
            skinIndex = 0;

            modal.style.display = 'block';
            modalContent.style.backgroundImage = `linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.90) 100%),url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champs[container.id].name}_0.jpg')`;

            skinInterval = setInterval(() => {
                skinIndex++;
                if (skinIndex === skinCount.length) {
                    skinIndex = 0;
                }
                modalContent.style.backgroundImage = `linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.90) 100%),url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champs[container.id].name}_${skinIndex}.jpg')`;
            }, 10000);
        });

        span.addEventListener('click', () => {
            modal.style.display = 'none';
        });
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

});

async function getChampSkin(champName) {
    const nombre = champName.name;
    const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/14.20.1/data/en_US/champion/${nombre}.json`);
    const data = await response.json();
    return data.data[nombre].skins;
}

