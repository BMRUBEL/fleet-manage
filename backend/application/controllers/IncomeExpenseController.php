<?php

use Firebase\JWT\JWT;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\SignatureInvalidException;
use Firebase\JWT\Key;

class IncomeExpenseController extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: *');
        header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
        $this->load->model('IncomeExpense_model');
    }


    public function getReport()
    {
        $header = apache_request_headers();
        $token = $header['Authorization'];

        try {
            $decoded = JWT::decode($token, new Key($this->config->item('encryption_key'), 'HS256'));
            // Your section starts here
            $data = json_decode(file_get_contents("php://input"), true);
            $Id = $this->IncomeExpense_model->getVid();

            if ($data['startDate'] != '') {
                $startDt = $data['startDate'];
                $endDt = $data['endDate'];
            } else {
                $II=$Id;
                if ($data['id'] != '') {
                    $startDt = date('Y-m-01');
                    $endDt = date('Y-m-d');
                } else {
                    $data['id'] = $II;
                    $startDt = date('Y-m-01');
                    $endDt = date('Y-m-d');
                }
            }
            $detls = $this->IncomeExpense_model->getReport($data['id'], $startDt, $endDt);
            $this->output->set_content_type('application/json')->set_output(json_encode(['report' => $detls, 'status' => true]));
            // Your section ends here
        } catch (ExpiredException $e) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $e->getMessage(), 'status' => false]));
        } catch (SignatureInvalidException $s) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $s->getMessage(), 'status' => false]));
        } catch (Exception $ex) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $ex->getMessage(), 'status' => false]));
        }
    }
}
