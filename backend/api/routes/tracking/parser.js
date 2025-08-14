export const parseFileData = (fileData) => {
    console.log(fileData)
    const rows = fileData.split(';').filter(line => line.trim());
    return rows.map(row => {
        const columns = row.split('|').map(col => col.trim());
        

            return {
                ID: String(columns[0]).trim(),
                NUMERO_CLIENTE: String(columns[1]).trim(),
                TIPO_MOVIMIENTO: String(columns[2]).trim(),
                CODIGO_MOVIMIENTO: String(columns[3]).trim(),
                CENTRO_EMISOR: String(columns[4]).trim(),
                NUMERO_MOVIMIENTO: String(columns[5]).trim(),
                NUMERO_SECUENCIA: String(columns[6]).trim(),
                NOMBRE: String(columns[7]).trim(),
                DESCRIPCION_ARTICULO: String(columns[8]).trim(),
                CANTIDAD: String(columns[9]).trim(),
                ESTADO: String(columns[10]).trim(),
            };
        
    });
};