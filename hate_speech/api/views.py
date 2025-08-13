from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import PredictOutputSerializer
from .utils import predict_text


class ModelPredictAPIView(APIView):
    
    def post(self, request):
        text = request.data.get("text", "")
        result = predict_text(text)
        # result is already a dict: {'prediction': ..., 'probability': ...}
        output_serializer = PredictOutputSerializer(data={
            'label': result['prediction'],
            'probability': result['probability']
        })
        output_serializer.is_valid(raise_exception=True)
        return Response(output_serializer.data)

    





