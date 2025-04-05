import { useState } from "react";
import "./DailyCommissions.css"

function DailyCommissions()
{
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let isCommissionFinish = false;
    const commissions = [{commissionName: "Study 1h with the study timer", commissionExp: 10}];
    const [commissionToComplete, setCommissionToComplete] = useState(commissions[getRandomInt(0, commissions.length-1)].commissionName);
    return(
        <div>
            <header>
                Today Commission: 
            </header>
            <h4>
                --- {commissionToComplete} (Not done)
            </h4>
        </div>
    );
}

export default DailyCommissions