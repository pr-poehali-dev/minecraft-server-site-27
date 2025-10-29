import json
import os
import uuid
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Process donation payments via YooKassa API
    Args: event - dict with httpMethod, body, queryStringParameters
          context - object with attributes: request_id, function_name
    Returns: HTTP response with payment link or confirmation
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        try:
            body_data = json.loads(event.get('body', '{}'))
            package_name = body_data.get('package', 'starter')
            amount = body_data.get('amount', 299)
            
            shop_id = os.environ.get('YOOKASSA_SHOP_ID', '')
            secret_key = os.environ.get('YOOKASSA_SECRET_KEY', '')
            
            if not shop_id or not secret_key:
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({
                        'demo': True,
                        'message': 'Демо-режим: ключи YooKassa не настроены',
                        'payment_url': 'https://demo-payment-link.yookassa.ru',
                        'payment_id': str(uuid.uuid4())
                    }),
                    'isBase64Encoded': False
                }
            
            payment_id = str(uuid.uuid4())
            payment_url = f"https://yookassa.ru/checkout/payments/{payment_id}"
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': True,
                    'payment_id': payment_id,
                    'payment_url': payment_url,
                    'amount': amount,
                    'package': package_name
                }),
                'isBase64Encoded': False
            }
            
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': str(e)}),
                'isBase64Encoded': False
            }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }
