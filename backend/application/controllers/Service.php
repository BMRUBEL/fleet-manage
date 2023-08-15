<?php
use Firebase\JWT\JWT;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\SignatureInvalidException;
use Firebase\JWT\Key;
Class Service extends CI_Controller

{
    public function __construct() {
        parent::__construct();
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: *');
        header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

        
        $this->load->model('Service_model');
    }

     public function servicefile()
    {
        $data['title']=$this->input->post('title');
        $data['descript']=$this->input->post('descript');
     
   
        
        $config['upload_path']          = './uploads/';
        $config['allowed_types']        = 'gif|jpg|png|PNG|jfif|PDF|pdf|svg';
        $this->load->library('upload', $config);

        if ( ! $this->upload->do_upload('photo'))
        {
                $error = array('error' => $this->upload->display_errors());
                $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$error, 'status'=>false]));
 
        } else{
                $photo=$this->upload->data();
                $data['photo'] = $photo['file_name'];
        }

        if ( ! $this->upload->do_upload('icon'))
        {
                $error = array('error' => $this->upload->display_errors());
                $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$error, 'status'=>false]));
 
        } else{
                $photo=$this->upload->data();
                $data['icon'] = $photo['file_name'];
        }
        
        $this->Service_model->saveservice($data);
        $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>'Successfully Inserted!','status'=>true]));
    }


    public function service_list()
    {
        $data=$this->Service_model->list();
        $this->output->set_content_type('application/json')->set_output(json_encode(['list'=>$data,'status'=>true]));
    }

    public function  deleteservice()
    {
        
        $header = apache_request_headers();
        $token=$header['Authorization'];
        try{
            $decoded=JWT::decode($token,new Key($this->config->item('encryption_key'),'HS256'));
            // Your section starts here
            $data=json_decode(file_get_contents("php://input"),true);
            $d=$this->Service_model->deleteservice($data['id']);
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>'Successfully deleted!','status'=>true]));
            // Your section ends here
        }catch(ExpiredException $e){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$e->getMessage(),'status'=>false]));
        }catch(SignatureInvalidException $s){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$s->getMessage(),'status'=>false]));
        }catch(Exception $ex){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$ex->getMessage(),'status'=>false]));
        }

    }

    public function editservice()
    {
        
        $header = apache_request_headers();
        $token=$header['Authorization'];
        try{
            $decoded=JWT::decode($token,new Key($this->config->item('encryption_key'),'HS256'));
            // Your section starts here
            $data=json_decode(file_get_contents("php://input"),true);
            $d=$this->Service_model->editserv($data['id']);
            $this->output->set_content_type('application/json')->set_output(json_encode(['user'=>$d,'status'=>true]));
            // Your section ends here
        }catch(ExpiredException $e){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$e->getMessage(),'status'=>false]));
        }catch(SignatureInvalidException $s){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$s->getMessage(),'status'=>false]));
        }catch(Exception $ex){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$ex->getMessage(),'status'=>false]));
        }
    }

    public function updateservice($id)
    {
        $data['id']=$id;
        $data['title']=$this->input->post('title');
        $data['descript']=$this->input->post('descript');
        $data['icon']=$this->input->post('icon');
   
        
        $photo=$this->input->post('photo');

        $config['upload_path']          = './uploads/';
        $config['allowed_types']        = 'gif|jpg|png|PNG|jfif|PDF|pdf|svg';
        $this->load->library('upload', $config);

        if ( ! $this->upload->do_upload('photo'))
        {
                $error = array('error' => $this->upload->display_errors());
                $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$error, 'status'=>false]));
 
        } else{
                $photo=$this->upload->data();
                $data['photo'] = $photo['file_name'];
        }
        if ( ! $this->upload->do_upload('icon'))
        {
                $error = array('error' => $this->upload->display_errors());
                $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$error, 'status'=>false]));
 
        } else{
                $photo=$this->upload->data();
                $data['icon'] = $photo['file_name'];
        }
         
        // print_r($data);
        // exit;
       $p= $this->Service_model->updateservice($data);
        $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>'Successfully Updated!','status'=>true,'data'=>$p]));
    }

}