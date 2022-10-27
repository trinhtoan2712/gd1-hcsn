export const StyleFormat = {
    FORMAT_NUMBER: ".",

    // đổi cả / khi muốn đổi định dạng
    FORMAT_DATE: "dd/MM/YYYY",
    CHARACTER_DATE: "/",
};

export const FullUrl = {
    URL_FIXED_ASSET: "http://localhost:14537/api/FixedAssets/"
}

export const EndPoint = {
    //token
    END_POINT_TOKEN: "api/token",

    //tài sản
    END_POINT_FIXED_ASSET: "api/FixedAssets",
    
    //ghi tăng
    END_POINT_FIXED_ASSET_INCREMENT_DETAIL_GETONE: "getOne/filter",
    END_POINT_FIXED_ASSET_INCREMENT_FILTER: "filter",
    END_POINT_FIXED_ASSET_INCREMENT: "api/FixedAssetIncrement",
    END_POINT_FIXED_ASSET_INCREMENT_DETAIL: "api/FixedAssetIncrement/list",
    END_POINT_FIXED_ASSET_INCREMENT_DETAIL_LIST: "api/FixedAssetIncrementDetail/list",
};

export const Host = {
    BASE_URL: "http://localhost:14537/"
}

export const NameCookie = {
    NAME_TOKEN: "Token",
    NAME_AUTH: "Auth",
    EXPIRES: "Expires=Thu, 01 Jan 1970 00:00:01 GMT;"
};

export const KeyCode = {
    KEY_I: "73",
    KEY_C: "67",
    KEY_D: "68",
    KEY_DEL: "46",
    KEY_ENTER: "13",
    KEY_ARROWUP: "38",
    KEY_ARROWDOWN: "40",
}

export const MessWarning = {
    NO_RECORD: "Vui lòng chọn ít nhất 1 bản ghi",
    FORM_CHANGE: "Thông tin thay đổi sẽ không được cập nhật nếu bạn không lưu. Bạn có muốn lưu các thay đổi này ?",
    CANCEL_FORM: "Bạn có muốn hủy bỏ khai báo tài sản này không ?",
    DUPLICATE_CODE: "Mã tài sản đã tồn tại, đã sinh mã tài sản mới",
    MISSING_FIELD: "Thêm thất bại, dữ liệu không hợp lệ",
    EXCEPTION: "Lỗi hệ thống, vui lòng liên hệ MISA",
    NO_FIXED_ASSET: "Vui lòng chọn ít nhất 1 tài sản",
}

export const Notification = {
    DELETE_SUCCESS: "Xóa thành công !",
    DELETE_FAIL: "Xóa không thành công",
    SAVE_SUCCESS: "Lưu thông tin thành công",
    SAVE_FAIL: "Lưu thông tin không thành công"
}

export const TitleDialog = {
    INSERT_ASSET: "Thêm tài sản",
    UPDATE_ASSET: "Sửa tài sản",
    DUPLICATE_ASSET: "Nhân bản tài sản",
    INSERT_ASSET_INCREMENT: "Thêm chứng từ",
    UPDATE_ASSET_INCREMENT: "Sửa chứng từ",
}

export const StatusAsset = {
    USED: 1,
    NOT_USED: 0,
}

export const LengthInput = {
    MAX_INT: 2147483647,
    LENGTH_GUID: 36,
    LENGTH_CODE: 20,
    LENGTH_NAME: 255,
    LENGTH_NUMBER: 18,
}

export const StatusCodeResApi = {
    CREATED: 201,
    SUCCESS: 200,
}

export const ErrorCode = {
    DUPLICATE_CODE: 3,
    VALIDATE: 2,
    EXCEPTION: 1,
}