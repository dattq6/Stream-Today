import axios from "axios"

export const fetchArticles = async (tournament: string) => {
    try {
        const response = await axios.get(`https://bamboostream.live/api/news?tournament=${tournament}`);
        return response.data?.map((item: any) => item.raw);
    } catch (error) {
        console.log(error);
        return []
    }
}