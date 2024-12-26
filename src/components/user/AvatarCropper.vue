<template>
    <el-dialog title="图片裁切" class="cropper-dialog" :close-on-click-modal="false" :visible="dialogVisible" center
        @close="close">
        <div class="cropper-wrap">
            <div class="cropper-box" :style="cropperStyle">
                <vue-cropper ref="cropper" :img="option.img" :output-size="option.size" :output-type="option.outputType"
                    :info="option.info" :full="option.full" :canScale="option.canScale" :can-move="option.canMove"
                    :can-move-box="option.canMoveBox" :fixed="option.fixed" :fixed-box="option.fixedBox"
                    :original="option.original" :auto-crop="option.autoCrop" :auto-crop-width="option.autoCropWidth"
                    :auto-crop-height="option.autoCropHeight" :center-box="option.centerBox" :high="option.high"
                    :info-true="option.infoTrue" :max-img-size="option.maxImageSize" :enlarge="option.enlarge"
                    :mode="option.mode" @realTime="realTime" />
            </div>
            <div class="preview-box">
                <div class="preview-title">
                    <span>预览</span>
                    <span @click="upload" class="preveiw-upload">上传</span>
                </div>
                <input ref="upload" type="file" style="position:absolute; clip:rect(0 0 0 0);"
                    accept="image/png, image/jpeg, image/jpg" @change="uploadImg">
                <div :style="previewStyle" class="preview-img">
                    <div :style="preview.div">
                        <img :style="preview.img" :src="preview.url" />
                    </div>
                </div>
            </div>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取消</el-button>
            <el-button type="primary" @click="finish" :loading="loading">确认</el-button>
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted, onBeforeUnmount } from 'vue'
import { ElMessage } from 'element-plus'
// import VueCropper from 'vue-cropper'
// import 'vue3-cropper/dist/style.css'

const props = defineProps<{
    img: string;
    size: number;
    outputType: string;
    info: boolean;
    full: boolean;
    canScale: boolean;
    canMove: boolean;
    canMoveBox: boolean;
    fixed: boolean;
    fixedBox: boolean;
    original: boolean;
    autoCrop: boolean;
    autoCropWidth: number;
    autoCropHeight: number;
    centerBox: boolean;
    high: boolean;
    infoTrue: boolean;
    maxImageSize: number;
    enlarge: number;
    mode: string;
    maxImgSize: number;
}>();

const dialogVisible = ref(false);
const loading = ref(false);
const option = reactive({
    img: props.img,
    size: props.size,
    outputType: props.outputType,
    info: props.info,
    full: props.full,
    canScale: props.canScale,
    canMove: props.canMove,
    canMoveBox: props.canMoveBox,
    fixed: props.fixed,
    fixedBox: props.fixedBox,
    original: props.original,
    autoCrop: props.autoCrop,
    autoCropWidth: props.autoCropWidth,
    autoCropHeight: props.autoCropHeight,
    centerBox: props.centerBox,
    high: props.high,
    infoTrue: props.infoTrue,
    maxImageSize: props.maxImageSize,
    enlarge: props.enlarge,
    mode: props.mode,
    maxImgSize: props.maxImgSize,
});

const cropperStyle = computed(() => ({
    width: '100%',
    height: '400px',
}));

const preview = reactive({
    url: '',
    img: {},
    div: {},
});

const previewStyle = computed(() => ({
    width: '100px',
    height: '100px',
    overflow: 'hidden',
}));

// const { getCropData } = VueCropper();

const uploadImg = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            option.img = e.target?.result as string;
        };
        reader.readAsDataURL(file);
    }
};

const upload = () => {
    const uploadInput = ref<HTMLInputElement | null>(null);
    if (uploadInput.value) {
        uploadInput.value.click();
    }
};

const realTime = (data: any) => {
    preview.url = data.url;
    preview.img = data.img;
    preview.div = data.div;
};

const close = () => {
    dialogVisible.value = false;
};

const finish = async () => {
    loading.value = true;
    try {
        // const cropData = await getCropData();
        // 处理裁剪后的图片数据
        ElMessage.success('图片裁剪成功');
        close();
        // emit('crop-finish', cropData);
    } catch (error) {
        ElMessage.error('图片裁剪失败');
    } finally {
        loading.value = false;
    }
};

const openCropper = (img: string) => {
    option.img = img;
    dialogVisible.value = true;
};

const getCroppedImage = async () => {
    try {
        // const cropData = await getCropData();
        // return cropData;
    } catch (error) {
        ElMessage.error('获取裁剪图片失败');
        return null;
    }
};

defineExpose({ openCropper, getCroppedImage });

onMounted(() => {
    // 初始化操作
});

onBeforeUnmount(() => {
    // 清理操作
});
function emit(arg0: string, cropData: any) {
    throw new Error('Function not implemented.');
}
</script>