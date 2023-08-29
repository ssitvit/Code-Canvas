import {useContext} from "react";
import {ExpTrackCon} from "./components/Context/Context";
import {incomeCategories, expenseCategories, resetCategories} from "./Constants/categories";

const useTransaction = (title) => {
    resetCategories();

    const {transaction} = useContext(ExpTrackCon);
    const transPerType = transaction.filter((t) => t.type === title);
    const total = transPerType.reduce((acc, currVal) => acc += currVal.amount, 0);

    const cats = title === "Income" ? incomeCategories : expenseCategories;

    console.log({transPerType, total, cats});

    transPerType.forEach((t) => {
        const cat = cats.find((c) => c.type === t.category);

        if (cat) cat.amount += t.amount;
    })

    const filterCat = cats.filter((c) => c.amount > 0);

    const chartData = {
        datasets: [{
            data: filterCat.map((c) => c.amount),
            backgroundColor: filterCat.map((c) => c.color),
        }],
        labels: filterCat.map((c) => c.type)
    }

    return { filterCat, chartData, total }
}

export default useTransaction;