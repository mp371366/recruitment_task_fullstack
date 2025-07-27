<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class DefaultController extends AbstractController
{
  private const base = "https://api.nbp.pl/api";
  private const format = "?format=json";
  private const buyCurrencies  = array("USD", "EUR");

  public function index(): Response
  {
    return $this->render(
      'app-root.html.twig'
    );
  }

  private function buy(string $code, float $value): string|float {
    return in_array($code, self::buyCurrencies) ? $value - 0.15 : "N/A";
  }

  private function sale(string $code, float $value): float {
    return $value + (in_array($code, self::buyCurrencies) ?0.11 : 0.2);
  }

  public function currencies(): Response
  {
    $url = self::base . "/exchangerates/tables/A" . self::format;
    $json = file_get_contents($url);
    $obj = json_decode($json);
    $func = function($rate) {
      return array(
        "code" => $rate->code,
        "currency" => $rate->currency,
        "sale" => self::sale($rate->code, $rate->mid),
        "buy" => self::buy($rate->code, $rate->mid)
      );
    };
    $jsonRes = json_encode(array(
      "date" => $obj[0]->effectiveDate,
      "rates" => array_map($func, $obj[0]->rates)
    ));
    $response = new Response($jsonRes, Response::HTTP_OK);
    $response->headers->set('Content-Type', 'application/json');
    return $response;
  }

  public function currency(string $currency, string $startDate, string $endDate): Response
  {
    $url = self::base . "/exchangerates/rates/A/$currency/$startDate/$endDate" . self::format;
    $json = file_get_contents($url);
    $obj = json_decode($json);
    $func = function($rate) use ($obj) {
      return array(
        "date" => $rate->effectiveDate,
        "sale" => self::sale($obj->code, $rate->mid),
        "buy" => self::buy($obj->code, $rate->mid)
      );
    };
    $obj->rates = array_map($func, $obj->rates);
    $jsonRes = json_encode($obj);
    $response = new Response($jsonRes, Response::HTTP_OK);
    $response->headers->set('Content-Type', 'application/json');
    return $response;
  }
}