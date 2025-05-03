/*
 * set( $owner = "Alexander Daza (dev.alexander.daza@gmail.com)" )
 * Copyright (c) ${velocityHashtag}if($originalComment.isEmpty())2025. $owner. All rights reserved.
 *
 * This software is provided "as is," without warranty of any kind, express or
 * implied, including but not limited to the warranties of merchantability,
 * fitness for a particular purpose and noninfringement. In no event shall the
 * authors or copyright holders be liable for any claim, damages or other
 * liability, whether in an action of contract, tort or otherwise, arising from,
 * out of or in connection with the software or the use or other dealings in the
 * software.
 */
import fs from 'fs'
import path from 'path'

const getOutputDir = () => {
    // Directorio donde se almacenarán las imágenes
    const OUTPUT_DIR = path.join(process.cwd(), 'public')
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    return OUTPUT_DIR
}

export { getOutputDir }
