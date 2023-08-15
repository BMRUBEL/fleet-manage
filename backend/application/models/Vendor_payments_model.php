<?php

class Vendor_payments_model extends CI_Model
{
    public function savemaintenance($data)
    {
        $this->db->insert('vendor_payments',['vendor_id'=>$data['vendor_id'],'due_payment'=>$data['due_payment'],'paid_amount'=>$data['paid_amount'],'payment_date'=>$data['payment_date']]);

	}
    
  
    public function getvendor()
    {
        return $this->db->select('id')->get('maintenances')->result();
    }
    public function getduepayment()
    {
        return $this->db->select('cost')->get('maintenances')->result();
    }
    public function getmainid()
    {
        return $this->db->select('id,vendor_')->get('maintenances')->result();
    }
   
    public function getvendorspayment()
    {
		$this->db->select('vendors.id, vendors.name as vendorname, SUM(maintenances.cost) as total_cost')
		->from('maintenances')
		->join('vendors', 'vendors.id = maintenances.vendor_id')
		->where('status','completed')
		->group_by('vendors.id')
		->order_by('maintenances.id', 'DESC');
	
	$results = $this->db->get()->result();
	return $results;
	
		
    }
    public function editmaintenance($id)
    {
      return $this->db->select('maintenances.*')->where('id',$id)->get('maintenances')->row();
    //   ->from('maintenances')
    //   ->join('vehicles', 'vehicles.id=maintenances.vehicle_id')
    //   ->join('vendors', 'vendors.id=maintenances.vendor_id')
      
    }
    public function updaemaintenance($data){
    $this->db->where('id',$data['id'])->update('maintenances',$data);
    }
    public function deletemaintenance($data)
    {
        $this->db->where('id',$data['id'])->delete('maintenances',$data);
    }

	public function savevendorpayment($data)
	{
		$this->db->insert('vendor_payments', ['vendor_id'=>$data['vendor_id'],'paid_amount'=>$data['paid_amount'],'payment_date'=>$data['payment_date']]);
	}
	public function getpayment()
	{

		return $this->db->select('vendor_payments.*, vendors.name as vendor')
		->from('vendor_payments')
		->join('vendors', 'vendors.id=vendor_payments.vendor_id')
		->get()->result();
	}
}
