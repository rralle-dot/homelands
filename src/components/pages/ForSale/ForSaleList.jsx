import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Layout } from "../../App/Layout/Layout"
import axios from 'axios';
import './ForSaleList.scss'

export const ForSaleList = () => {
    
    const { home_id } = useParams(0);
    const [ homeList, setHomeList ] = useState([]);
    
    useEffect(() => {
        const getHomeList = async () => {
            try {
                const response = await axios.get('https://api.mediehuset.net/homelands/homes')
                if (response.data) {
                    setHomeList(response.data.items)
                }
            } catch (error) {
                console.log(error);
            }
        }
        getHomeList();
    }, [])
    
    return(
        <Layout title='Boliger til salg'>
            <article>
            {homeList && homeList.map(home => {
                let val = Number(home.price).toLocaleString('da-DK');
                // home_id == home.id;
               return(
                   <figure key={home.id} className='card'>
                        <Link to={`${home.id}`}>
                            <img src={home.images[0].filename.medium} alt={home.type} />
                        </Link>
                        <figcaption>
                            <article className="AddressInfo">
                            <h4>{home.address}</h4>
                            <h5>{home.zipcode} {home.city}</h5>
                            <h5>{home.type}</h5>
                            </article>
                            <article className="EconomyInfo">
                                <div>
                                    <p className={home.energy_label_name}>{home.energy_label_name} </p>
                                    <p>{home.num_rooms} værelser, {home.floor_space}m2</p>
                                </div>
                                <p>{val} DKK</p>
                            </article>
                        </figcaption>
                    </figure>
                )
            })}
            </article>
        </Layout>
    )
}