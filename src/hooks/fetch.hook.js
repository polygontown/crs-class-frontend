import axios from "axios";
import { useState, useEffect } from "react";
import ENV from "../config";

export function useFetchContent(cname) {
    const [getData, setData] = useState({
        isLoading: false,
        apiData: undefined,
        status: null,
        serverError: null
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                setData(prev => ({ ...prev, isLoading: true }));
                const { data, status } = await axios.get(`${ENV.SERVER_ADD}/api/get-content?cname=${cname}`);
                if (status === 201) {
                    setData(prev => ({ ...prev, isLoading: false }));
                    setData(prev => ({ ...prev, apiData: data, status: status }));
                }
                setData(prev => ({ ...prev, isLoading: false }))
            } catch (error) {
                setData(prev => ({ ...prev, isLoading: false, serverError: error }));
            }
        };
        fetchData();
    }, [cname]);
    return [getData, setData];
}

export function useFetchUser(query) {
    const [getData, setData] = useState({
        isLoading: false,
        apiData: undefined,
        status: null,
        serverError: null
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                setData(prev => ({ ...prev, isLoading: true }));
                const token = localStorage.getItem("token");
                if (!token) {
                    setData(prev => ({ ...prev, serverError: true }));
                }
                const { data, status } = await axios.get(`${ENV.SERVER_ADD}/api${query}`, { headers: { "Authorization": `Beare ${token}` } });
                if (status === 201 || status === 200) {
                    setData(prev => ({ ...prev, isLoading: false }));
                    setData(prev => ({ ...prev, apiData: data, status: status }));
                }
                setData(prev => ({ ...prev, isLoading: false }))
            } catch (error) {
                setData(prev => ({ ...prev, isLoading: false, serverError: error }));
            }
        };
        fetchData();
    }, [query]);
    return [getData, setData];
}

export function useFetchDoc(query) {
    const [getData, setData] = useState({
        isLoading: false,
        apiData: undefined,
        status: null,
        serverError: null
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const cachedETag = localStorage.getItem(`ETag/api${query}`) || "";
                setData(prev => ({ ...prev, isLoading: true }));
                const token = localStorage.getItem("token");
                if (!token) {
                    setData(prev => ({ ...prev, serverError: true }));
                }
                const response = await axios.get(`${ENV.SERVER_ADD}/api${query}`, {
                    headers: {
                        "Authorization": `Beare ${token}`,
                        "If-None-Match": cachedETag,
                    },
                    validateStatus: (status) => status === 200 || status === 304 || status === 201,
                });
                if (response.status === 201 || response.status === 200) {
                    setCache(`http://data/api${query}`, JSON.stringify(response.data));
                    localStorage.setItem(`ETag/api${query}`, response.headers.etag || "");
                    setData(prev => ({ ...prev, isLoading: false }));
                    setData(prev => ({ ...prev, apiData: response.data, status: response.status }));
                }
                if (response.status === 304) {
                    setData(prev => ({ ...prev, isLoading: false }));
                    setData(prev => ({ ...prev, status: response.status }));
                    getCache(`http://data/api${query}`, setData);
                }
                setData(prev => ({ ...prev, isLoading: false }))
            } catch (error) {
                setData(prev => ({ ...prev, isLoading: false, serverError: error }));
            }
        };
        fetchData();
    }, [query]);
    return [getData, setData];
}


function setCache(key, value) {
    let req = new Request(key);
    let res = new Response(value);
    if ("caches" in window) {
        caches.open("crsclass")
            .then(cache => {
                cache.put(req, res)
                    .then(function () {
                        console.log('Response cached:');
                    })
                    .catch(function (error) {
                        console.error('Error storing request and response in cache:', error);
                    });
            })
            .catch(error => {
                console.log(error);
            })
    }
}

function getCache(key, setRes) {
    let req = new Request(key);
    console.log(window);
    if ("caches" in window) {
        caches.open("crsclass")
            .then(cache => {
                cache.match(req)
                    .then(res => {
                        if (!res) return console.log("Not found in cache");
                        res.text().then(value => {
                            setRes(prev => ({...prev, apiData: JSON.parse(value)}));
                        });
                    });
            })
            .catch(error => {
                console.log(error);
            })
    }
}