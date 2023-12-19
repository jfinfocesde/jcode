// pages/api/directories.js
import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';



// export async function GET(req: NextRequest) {
//     const searchParams = req.nextUrl.searchParams;
//     let query = searchParams.get('path');
//     if (!query) {
//         query = "";
//     }
//     let directoryPath = path.join(process.cwd(), "/src/app", query);
//     try {
//         const files = await fs.promises.readdir(directoryPath);
//         const directories = files.filter(file => fs.statSync(path.join(directoryPath, file)).isDirectory());
//         return NextResponse.json({ message: directories }, { status: 200 });
//     } catch (err) {
//         return NextResponse.json({ message: 'error' }, { status: 500 });
//     }
// }


// export async function GET(req: NextRequest) {
//     const searchParams = req.nextUrl.searchParams;
//     let query = searchParams.get('path');
//     if (!query) {
//         query = "";
//     }
//     let directoryPath = path.join(process.cwd(), "/src/app", query);
//     try {
//         const files = await fs.promises.readdir(directoryPath);
//         const directories = [];
//         for (const file of files) {
//             if (fs.statSync(path.join(directoryPath, file)).isDirectory()) {
//                 const dirFiles = await fs.promises.readdir(path.join(directoryPath, file));
//                 if (dirFiles.includes('page.tsx') || dirFiles.includes('page.md') || dirFiles.includes('page.mdx')) {
//                     directories.push({label:file,path:`/${file}`});
//                 }
//             }
//         }
//         return NextResponse.json({ message: directories }, { status: 200 });
//     } catch (err) {
//         return NextResponse.json({ message: 'error' }, { status: 500 });
//     }
// }

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    let query = searchParams.get('path');
    if (!query) {
        query = "";
    }
    let directoryPath = path.join(process.cwd(), "/src/app", query);
    try {
        const files = await fs.promises.readdir(directoryPath);
        const directories = [];
        for (const file of files) {
            const filePath = path.join(directoryPath, file);
            if (fs.statSync(filePath).isDirectory()) {
                const dirFiles = await fs.promises.readdir(filePath);
                if (dirFiles.includes('page.tsx') || dirFiles.includes('page.md') || dirFiles.includes('page.mdx')) {
                    directories.push(file);
                }
            }
        }
        return NextResponse.json({ message: directories }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: 'error' }, { status: 500 });
    }
}



