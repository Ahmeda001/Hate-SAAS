from rest_framework import serializers

class PredictInputSerializer(serializers.Serializer):
    text = serializers.CharField(required=True, allow_blank=False)
    image_path = serializers.CharField(required=False, allow_blank=True)


class PredictOutputSerializer(serializers.Serializer):
    label = serializers.CharField()
    probability = serializers.FloatField()
