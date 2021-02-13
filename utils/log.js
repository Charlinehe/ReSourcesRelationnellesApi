module.exports = {
    log: (request, error) => {
        const { rawHeaders, httpVersion, method, socket, url } = request;
        const { remoteAddress, remoteFamily } = socket;
        let date = new Date;

        console.log(
            Date.now(),
            rawHeaders[1],
            httpVersion,
            method,
            remoteAddress,
            remoteFamily,
            url,
            (error) ? (error.errno, error.code, error.sqlMessage) : 200,
        );
    }
}