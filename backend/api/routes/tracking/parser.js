export const parseFileData = (fileData) => {
    console.log(fileData)
    const rows = fileData.split(';').filter(line => line.trim());
    return rows.map(row => {
        const columns = row.split('|').map(col => col.trim());
        

            return {
                ID: String(columns[0]).trim(),
                TIPO_MOVIMIENTO: String(columns[1]).trim(),
                CODIGO_MOVIMIENTO: String(columns[2]).trim(),
                CENTRO_EMISOR: String(columns[3]).trim(),
                NUMERO_MOVIMIENTO: String(columns[4]).trim(),
                NUMERO_SECUENCIA: String(columns[5]).trim(),
                NOMBRE: String(columns[6]).trim(),
                DESCRIPCION_ARTICULO: String(columns[7]).trim(),
                CANTIDAD: String(columns[8]).trim(),
                ESTADO: String(columns[9]).trim(),
            };
        
    });
};