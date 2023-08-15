<?php

use Firebase\JWT\JWT;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\SignatureInvalidException;
use Firebase\JWT\Key;

class Maintenance extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: *');
        header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
        $this->load->model('Maintenance_model');
    }
    //----Add---------
    public function addmaintenance()
    {
        $data = json_decode(file_get_contents("php://input"), true);

        // var_dump($data['parts']);exit;
        // $data['password'] = md5($data['password']);
        $header = apache_request_headers();
        $token = $header['Authorization'];
        try {
            $decoded = JWT::decode($token, new Key($this->config->item('encryption_key'), 'HS256'));

            $d = $this->Maintenance_model->savemaintenance($data);
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => 'Successfully Inserted!', 'status' => true]));
        } catch (ExpiredException $e) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $e->getMessage(), 'status' => false]));
        } catch (SignatureInvalidException $s) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $s->getMessage(), 'status' => false]));
        } catch (Exception $ex) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $ex->getMessage(), 'status' => false]));
        }
    }
    //----edit----------
    public function getVehicle()
    {
        $data = $this->Maintenance_model->getvehicle();
        $this->output->set_content_type('application/json')->set_output(json_encode(['vehicle' => $data, 'status' => true]));
    }
    public function getVendor()
    {
        $data = $this->Maintenance_model->getvendor();
        $this->output->set_content_type('application/json')->set_output(json_encode(['vendor' => $data, 'status' => true]));
    }
    public function getMaintenance()
    {
        $data = $this->Maintenance_model->getmaintenance();
        $this->output->set_content_type('application/json')->set_output(json_encode(['maintenance' => $data, 'status' => true]));
    }
    public function getParts()
    {
        $data = $this->Maintenance_model->getparts();
        $this->output->set_content_type('application/json')->set_output(json_encode(['parts' => $data, 'status' => true]));
    }
    //----edit----------
    public function editMaintenance()
    {
        $header = apache_request_headers();
        $token = $header['Authorization'];
        try {
            $decoded = JWT::decode($token, new Key($this->config->item('encryption_key'), 'HS256'));
            // Your section starts here
            $data = json_decode(file_get_contents("php://input"), true);
            $d = $this->Maintenance_model->editmaintenance($data['id']);
            $this->output->set_content_type('application/json')->set_output(json_encode(['maintenance' => $d, 'status' => true]));
            // Your section ends here
        } catch (ExpiredException $e) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $e->getMessage(), 'status' => false]));
        } catch (SignatureInvalidException $s) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $s->getMessage(), 'status' => false]));
        } catch (Exception $ex) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $ex->getMessage(), 'status' => false]));
        }
    }
    public function updatemaintenance()
    {

        $header = apache_request_headers();
        $token = $header['Authorization'];
        try {
            $decoded = JWT::decode($token, new Key($this->config->item('encryption_key'), 'HS256'));
            // Your section starts here
            $data = json_decode(file_get_contents("php://input"), true);
            //    $data['password']=md5($data['password']);
            $this->Maintenance_model->updaemaintenance($data);
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => 'Successfully Updated!', 'status' => true]));
            // Your section ends here
        } catch (ExpiredException $e) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $e->getMessage(), 'status' => false]));
        } catch (SignatureInvalidException $s) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $s->getMessage(), 'status' => false]));
        } catch (Exception $ex) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $ex->getMessage(), 'status' => false]));
        }
    }
    public function deletemaintenance()
    {

        $header = apache_request_headers();
        $token = $header['Authorization'];
        try {
            $decoded = JWT::decode($token, new Key($this->config->item('encryption_key'), 'HS256'));
            // Your section starts here
            $data = json_decode(file_get_contents("php://input"), true);
            //    $data['password']=md5($data['password']);
            $this->Maintenance_model->deletemaintenance($data);
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => 'Successfully Deleted!', 'status' => true]));
            // Your section ends here
        } catch (ExpiredException $e) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $e->getMessage(), 'status' => false]));
        } catch (SignatureInvalidException $s) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $s->getMessage(), 'status' => false]));
        } catch (Exception $ex) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $ex->getMessage(), 'status' => false]));
        }
    }


    //Engine Oil Maintenance

    public function addoil()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        $header = apache_request_headers();
        $token = $header['Authorization'];
        try {
            $decoded = JWT::decode($token, new Key($this->config->item('encryption_key'), 'HS256'));

            $d = $this->Maintenance_model->saveoil($data);

            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => 'Successfully Inserted!', 'status' => true]));
        } catch (ExpiredException $e) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $e->getMessage(), 'status' => false]));
        } catch (SignatureInvalidException $s) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $s->getMessage(), 'status' => false]));
        } catch (Exception $ex) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $ex->getMessage(), 'status' => false]));
        }
    }

    public function getreminder()
    {
        $vehicle = $this->db->select('*')->get('vehicles')->result();

        $ttt = [];

        foreach ($vehicle as $kk) {

            $now = date('Y-m-d');

            $this->db->where('vehicle_id', $kk->id);
            $this->db->order_by('oil_change_date', 'desc');

            $query = $this->db->get('engine_oil_maintenance');
            $oil = $query->row();

            // array push------

            if(isset($oil->oil_change_date)){
                $r['date'] = $oil->oil_change_date;
                $r['name'] = $kk->name;
                $r['registration_no'] = $kk->registration_no;
            }

            // remaining date count-------

            $lastdate = date('Y-m-d', strtotime($r['date'] . '+ 21 days'));
            $fdate = date_create($now);
            $ldate = date_create($lastdate);
            $interval = date_diff($fdate, $ldate);
            $dd = $interval->format('%R%a');
            $mm = intval($dd);
            $r['date_chan'] = $mm;


            $dates[] = $r;
            $ttt[$mm] = $r;
        }
        ksort($ttt);
        return $this->output->set_content_type('application/json')->set_output(json_encode(['reminder' => $ttt, 'status' => true]));
    }

    
}
