<?php

use Firebase\JWT\JWT;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\SignatureInvalidException;
use Firebase\JWT\Key;

class Vendorspayment extends CI_Controller
{
	public function __construct()
	{
		parent::__construct();
		header('Access-Control-Allow-Origin: *');
		header('Access-Control-Allow-Headers: *');
		header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
		$this->load->model('Vendor_payments_model');
	}
	//----Add---------
	public function addvendorpayment()
	{
		$data = json_decode(file_get_contents("php://input"), true);
		$header = apache_request_headers();
		$token = $header['Authorization'];
		try {
			$decoded = JWT::decode($token, new Key($this->config->item('encryption_key'), 'HS256'));
			$d = $this->Vendor_payments_model->savevendorpayment($data);

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

	public function getVendor()
	{
		$data = $this->Vendor_payments_model->getvendor();
		$this->output->set_content_type('application/json')->set_output(json_encode(['vendor' => $data, 'status' => true]));
	}
	// public function getVendorspayment()
	// {
	//     $data=$this->Vendor_payments_model->getvendorspayment();
	//     $this->output->set_content_type('application/json')->set_output(json_encode(['payment' => $data, 'status' => true]));
	// 	// var_dump($data);
	// }
	public function getdue()
	{
		$data = $this->Vendor_payments_model->getduepayment();
		$this->output->set_content_type('application/json')->set_output(json_encode(['due' => $data, 'status' => true]));
	}

	public function getVendorspayment()
	{
		$data = $this->Vendor_payments_model->getvendorspayment();
		$this->db->select('paid_amount')->get('vendor_payments')->result();
		$pay=[];
		foreach ($data as $k => $v) {
			$cost = $v->total_cost;

			$this->db->where('vendor_id', $v->id);
			$query = $this->db->get('vendor_payments');
			$vendor = $query->row();

			$due=$cost;
			if(isset($vendor)){
				$paidamount = $vendor->paid_amount;
				$due = $cost - $paidamount;
			}
			
			$fdue = intval($due);
			
				$p['due'] = $fdue;
				$p['id'] = $v->id;
				$p['name'] = $v->vendorname;
				
			$pay[] = $p;
			// var_dump($pay);
		}

		return $this->output->set_content_type('application/json')->set_output(json_encode(['payment' => $pay, 'status' => true]));
	}


	public function getpayment()
	{
		$data=$this->Vendor_payments_model->getpayment();
        $this->output->set_content_type('application/json')->set_output(json_encode(['list'=>$data,'status'=>true]));
		// var_dump($data);
	}
}
