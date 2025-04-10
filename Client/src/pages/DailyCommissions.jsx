import { useEffect, useState } from "react"
import axios from "axios"

export default function DailyCommissions() {
    function getRandomInt(min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    const [users, setUsers] = useState([])

    useEffect(() => {
        async function fetchData() {
            await axios
                .get("http://localhost:8080/getUsers")
                .then(req => setUsers(req.data))
                .catch(err => console.log(err))
        }
        fetchData()
    }, [])

    // const commissions = [{ commissionName: "Study 1h with the study timer", commissionExp: 10 }]
    // const [commissionToComplete, setCommissionToComplete] = useState(
    //     commissions[getRandomInt(0, commissions.length - 1)].commissionName
    // )
    return (
        <div id="daily-commission">
            <header>Today Commission</header>

            <h4>--- {"Study 1h (Study Timer)"} (Not done)</h4>
        </div>
    )
}
