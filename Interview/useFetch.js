/**
 * @Author: giaruei
 * @Date: 2024-11-30 16:00:51
 * @LastEditors: giaruei caigiaruei@gmail.com
 * @LastEditTime: 2024-11-30 16:05:02
 * @FilePath: /Front-Try/Interview/useFetch.js
 * @Description: 手写一个发请求的 custom hook
 */

// useFetch.js
import { useState, useEffect } from "react";
import axios from "axios";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading("loading...");
    setData(null);
    setError(null);
    const source = axios.CancelToken.source();
    axios
      .get(url, { cancelToken: source.token })
      .then((res) => {
        setLoading(false);
        //checking for multiple responses for more flexibility
        //with the url we send in.
        res.data.content && setData(res.data.content);
        res.content && setData(res.content);
      })
      .catch((err) => {
        setLoading(false);
        setError("An error occurred. Awkward..");
      });
    return () => {
      source.cancel();
    };
  }, [url]);

  return { data, loading, error };
}
export default useFetch;
