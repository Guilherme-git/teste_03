<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Exception;

class IndexController extends Controller
{
    public function index(Request $request)
    {
        $url = "https://viacep.com.br/ws/". $request->cep ."/json/";

        $curl = curl_init($url);
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

        $result = curl_exec($curl);

        $result_json = json_decode( $result, true );

        return response()->json(["message"=>$result_json]);
    }

    public function export(Request $request)
    {
        $results = json_decode($request->values,true);
        $cabecalho_csv = ["CEP","Logradouro","Bairro","Localidade","UF","Complemento","IBGE","GIA","DDD","Siafi"];

        $out = fopen( 'file.csv','w' );
        fputcsv( $out, $cabecalho_csv, ";" );
        foreach ( $results as $result )
        {
            fputcsv( $out, $result,";" );
        }
        fclose( $out );

        return response()->json(["message"=>"Arquivo CSV criado"]);
    }

}
