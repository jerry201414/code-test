const urls = [
    "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting1.png",
    "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting2.png",
    "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting3.png",
    "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting4.png",
    "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting5.png",
    "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn6.png",
    "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn7.png",
    "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn8.png",
];

const loadImg = (url) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            console.log("load success:", url);
            resolve(img);
        };
        img.onerror = (error) => {
            console.error(error);
            reject(new Error("Could not load image at " + url));
        };
        img.src = url;
    });
};

// 限制并发数
const limitLoad = (urls, handler, limit) => {
    const tmpUrls = [...urls];
    const promises = tmpUrls.splice(0, limit).map((url, index) => {
        return handler(url).then(() => index);
    });
    return tmpUrls
        .reduce((pre, url) => {
            return pre
                .then(() => {
                    return Promise.race(promises);
                })
                .then((fastestIndex) => {
                    promises[fastestIndex] = handler(url).then(
                        () => fastestIndex
                    );
                })
                .catch((err) => {
                    console.error(err);
                });
        }, Promise.resolve())
        .then(() => {
            return Promise.all(promises);
        });
};

limitLoad(urls, loadImg, 3)
    .then((res) => {
        console.log("All images loaded successfully");
        console.log(res);
    })
    .catch((err) => {
        console.error(err);
    });
