import { mapArraytoObj } from "@/lib/google-apis/mapArrayToObj";
import { accessSheet } from "@/lib/google-apis/sheets";
import { NextResponse } from "next/server";

const spreadsheetId = `${process.env.BUSINESS_SPREADSHEET_ID}`
export async function GET(req: Request) {
    try{
        const range = 'Sheet2!A1:N10'; // Adjust the range according to your sheet
        const result:any = await accessSheet(spreadsheetId, range)
        const data=mapArraytoObj(result)
        return Response.json({
            data,
            rows:result.length,
            columns:result[0].length,
        })
    }catch(error:any){
        console.error('Error:', error); // Return an error response
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}